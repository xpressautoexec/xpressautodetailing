-- Store a random shared secret in vault for trigger <-> edge function auth
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM vault.secrets WHERE name = 'notify_contact_secret') THEN
    PERFORM vault.create_secret(encode(gen_random_bytes(32), 'hex'), 'notify_contact_secret');
  END IF;
END $$;

-- Private RPC: returns the shared secret. Restricted to service_role only.
CREATE OR REPLACE FUNCTION public.get_notify_contact_secret()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, vault
AS $$
DECLARE
  v_secret text;
BEGIN
  SELECT decrypted_secret INTO v_secret
  FROM vault.decrypted_secrets
  WHERE name = 'notify_contact_secret'
  LIMIT 1;
  RETURN v_secret;
END;
$$;

REVOKE ALL ON FUNCTION public.get_notify_contact_secret() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_notify_contact_secret() TO service_role;

-- Update trigger to send the shared secret as a header.
-- Keeps SECURITY DEFINER (required to read vault), but search_path is pinned.
CREATE OR REPLACE FUNCTION public.notify_contact_submission()
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
    url := 'https://ifdkpmtnybzmxhtbzeae.supabase.co/functions/v1/notify-contact',
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