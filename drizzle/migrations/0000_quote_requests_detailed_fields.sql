ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS vehicle_category text,
  ADD COLUMN IF NOT EXISTS vehicle_year text,
  ADD COLUMN IF NOT EXISTS vehicle_make text,
  ADD COLUMN IF NOT EXISTS vehicle_model text,
  ADD COLUMN IF NOT EXISTS vehicle_color text,
  ADD COLUMN IF NOT EXISTS length_ft text,
  ADD COLUMN IF NOT EXISTS services text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS timing text,
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS contact_pref text,
  ADD COLUMN IF NOT EXISTS heard_from text,
  ADD COLUMN IF NOT EXISTS fbclid text,
  ADD COLUMN IF NOT EXISTS page_url text;

DROP POLICY IF EXISTS "Public can submit a quote request" ON public.quote_requests;
CREATE POLICY "Public can submit a quote request" ON public.quote_requests
FOR INSERT TO anon, authenticated
WITH CHECK (
  vehicle_type = ANY (ARRAY['Car/SUV','Truck','RV/Trailer','Boat','Fleet'])
  AND need = ANY (ARRAY['Interior','Full detail','Paint correction/ceramic','PPF/windshield film','Not sure'])
  AND char_length(name) BETWEEN 1 AND 120
  AND char_length(phone) BETWEEN 7 AND 30
  AND (area IS NULL OR char_length(area) <= 120)
  AND (location_pref IS NULL OR location_pref = ANY (ARRAY['mobile','shop','either']))
  AND (company_name IS NULL OR char_length(company_name) <= 200)
  AND (fleet_size IS NULL OR char_length(fleet_size) <= 60)
  AND (notes IS NULL OR char_length(notes) <= 2000)
  AND COALESCE(array_length(photo_paths, 1), 0) <= 6
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
  AND (vehicle_category IS NULL OR char_length(vehicle_category) <= 60)
  AND (vehicle_year IS NULL OR char_length(vehicle_year) <= 10)
  AND (vehicle_make IS NULL OR char_length(vehicle_make) <= 80)
  AND (vehicle_model IS NULL OR char_length(vehicle_model) <= 80)
  AND (vehicle_color IS NULL OR char_length(vehicle_color) <= 60)
  AND (length_ft IS NULL OR char_length(length_ft) <= 20)
  AND COALESCE(array_length(services, 1), 0) <= 15
  AND (timing IS NULL OR char_length(timing) <= 60)
  AND (email IS NULL OR char_length(email) <= 255)
  AND (contact_pref IS NULL OR contact_pref = ANY (ARRAY['Call','Text','Email']))
  AND (heard_from IS NULL OR char_length(heard_from) <= 60)
  AND (fbclid IS NULL OR char_length(fbclid) <= 300)
  AND (page_url IS NULL OR char_length(page_url) <= 500)
);