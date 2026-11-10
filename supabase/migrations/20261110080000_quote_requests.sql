-- Native quote flow: lead records, photo storage, and an email notification per lead.
-- Idempotent so it is safe to run more than once.

-- 1. Lead records -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  vehicle_type TEXT NOT NULL,
  need TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  area TEXT,
  location_pref TEXT,
  company_name TEXT,
  fleet_size TEXT,
  notes TEXT,
  photo_paths TEXT[] NOT NULL DEFAULT '{}',
  source TEXT,
  page_path TEXT,
  landing_page TEXT,
  referrer TEXT,
  gclid TEXT,
  gbraid TEXT,
  wbraid TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  status TEXT NOT NULL DEFAULT 'new'
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.quote_requests TO anon, authenticated;
GRANT ALL ON public.quote_requests TO service_role;

DROP POLICY IF EXISTS "Public can submit a quote request" ON public.quote_requests;
CREATE POLICY "Public can submit a quote request"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  vehicle_type IN ('Car/SUV', 'Truck', 'RV/Trailer', 'Boat', 'Fleet')
  AND need IN ('Interior', 'Full detail', 'Paint correction/ceramic', 'PPF/windshield film', 'Not sure')
  AND char_length(name) BETWEEN 1 AND 120
  AND char_length(phone) BETWEEN 7 AND 30
  AND (area IS NULL OR char_length(area) <= 120)
  AND (location_pref IS NULL OR location_pref IN ('mobile', 'shop'))
  AND (company_name IS NULL OR char_length(company_name) <= 200)
  AND (fleet_size IS NULL OR char_length(fleet_size) <= 60)
  AND (notes IS NULL OR char_length(notes) <= 2000)
  AND coalesce(array_length(photo_paths, 1), 0) <= 6
  AND status = 'new'
  AND (source IS NULL OR char_length(source) <= 80)
  AND (page_path IS NULL OR char_length(page_path) <= 300)
  AND (landing_page IS NULL OR char_length(landing_page) <= 500)
  AND (referrer IS NULL OR char_length(referrer) <= 500)
  AND (gclid IS NULL OR char_length(gclid) <= 300)
  AND (gbraid IS NULL OR char_length(gbraid) <= 300)
  AND (wbraid IS NULL OR char_length(wbraid) <= 300)
  AND (utm_source IS NULL OR char_length(utm_source) <= 200)
  AND (utm_medium IS NULL OR char_length(utm_medium) <= 200)
  AND (utm_campaign IS NULL OR char_length(utm_campaign) <= 200)
  AND (utm_term IS NULL OR char_length(utm_term) <= 200)
  AND (utm_content IS NULL OR char_length(utm_content) <= 200)
);
-- No SELECT/UPDATE/DELETE policies: leads are readable only with the service role.

-- 2. Photo storage (private) ----------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'quote-photos',
  'quote-photos',
  false,
  15728640,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
ON CONFLICT (id) DO UPDATE
SET public = false,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Visitors may upload into a folder named after their (client-generated) lead id, and nothing else.
DROP POLICY IF EXISTS "Public can upload quote photos" ON storage.objects;
CREATE POLICY "Public can upload quote photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'quote-photos'
  AND (storage.foldername(name))[1] ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
  AND array_length(storage.foldername(name), 1) = 1
);

-- 3. Email notification ----------------------------------------------------
-- Same pattern as contact_submissions: the trigger calls an edge function with the vault secret.
CREATE OR REPLACE FUNCTION public.notify_quote_request()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault
AS $function$
DECLARE
  v_secret text;
BEGIN
  SELECT decrypted_secret INTO v_secret
  FROM vault.decrypted_secrets
  WHERE name = 'notify_contact_secret'
  LIMIT 1;

  PERFORM net.http_post(
    url := 'https://ifdkpmtnybzmxhtbzeae.supabase.co/functions/v1/notify-quote',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZGtwbXRueWJ6bXhodGJ6ZWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0OTkyNTAsImV4cCI6MjA4NjA3NTI1MH0.0R7c_2C2YXld-0x6iIHFcQ6zX_h7w_UnOdtTh-WI4Eo',
      'x-notify-secret', v_secret
    ),
    body := jsonb_build_object('record', row_to_json(NEW))
  );
  RETURN NEW;
END;
$function$;

REVOKE ALL ON FUNCTION public.notify_quote_request() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_quote_request_notify ON public.quote_requests;
CREATE TRIGGER on_quote_request_notify
AFTER INSERT ON public.quote_requests
FOR EACH ROW
EXECUTE FUNCTION public.notify_quote_request();
