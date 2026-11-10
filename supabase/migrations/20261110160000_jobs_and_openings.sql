-- Job receipts and "Next openings": two small tables the owner edits in Lovable Cloud.
-- Public can read only what is published / active. Writes need the dashboard (service role).

-- 1. Jobs ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('car', 'rv', 'fleet', 'marine', 'ceramic_ppf')),
  vehicle TEXT NOT NULL,
  package_name TEXT NOT NULL,
  price_paid NUMERIC(10, 2),
  time_on_site TEXT,
  city TEXT,
  crew TEXT[] NOT NULL DEFAULT '{}',
  photo_before TEXT,
  photos TEXT[] NOT NULL DEFAULT '{}',
  photo_alts TEXT[] NOT NULL DEFAULT '{}',
  featured_rank INT,
  sort_order INT NOT NULL DEFAULT 100,
  published BOOLEAN NOT NULL DEFAULT true,
  admin_notes TEXT
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.jobs TO anon, authenticated;
GRANT ALL ON public.jobs TO service_role;

DROP POLICY IF EXISTS "Public can read published jobs" ON public.jobs;
CREATE POLICY "Public can read published jobs"
ON public.jobs FOR SELECT TO anon, authenticated
USING (published = true);

-- Public bucket for new job photos (paste the file's public URL into jobs.photos).
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('job-photos', 'job-photos', true, 15728640, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- 2. Next openings -----------------------------------------------------------
-- One row per open slot. Past slots disappear on their own. scope: all | auto | rv | fleet | marine | ceramic_ppf
CREATE TABLE IF NOT EXISTS public.next_openings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  starts_at TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  scope TEXT NOT NULL DEFAULT 'all' CHECK (scope IN ('all', 'auto', 'rv', 'fleet', 'marine', 'ceramic_ppf')),
  active BOOLEAN NOT NULL DEFAULT true,
  source TEXT NOT NULL DEFAULT 'manual'
);

ALTER TABLE public.next_openings ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.next_openings TO anon, authenticated;
GRANT ALL ON public.next_openings TO service_role;

DROP POLICY IF EXISTS "Public can read upcoming openings" ON public.next_openings;
CREATE POLICY "Public can read upcoming openings"
ON public.next_openings FOR SELECT TO anon, authenticated
USING (active = true AND starts_at > now());

-- 3. Seed jobs from the existing gallery (fields still to fill are listed in admin_notes) --
INSERT INTO public.jobs (slug, category, vehicle, package_name, city, featured_rank, sort_order, photos, photo_alts, admin_notes) VALUES
('mercedes-amg-gle','ceramic_ppf','Mercedes-AMG GLE','Paint correction + System X PRO ceramic',NULL,1,10,ARRAY['jobs/headlight-mercedes-white.webp','jobs/ceramic-mercedes-gle-badge.webp','jobs/ceramic-mercedes-gle-wheel.webp','jobs/headlight-mercedes-silver.webp']::text[],ARRAY['White Mercedes-AMG GLE headlight after paint correction and System X ceramic coating','Mercedes-AMG Biturbo badge on corrected white paint','Mercedes-AMG GLE wheel, fender and running board after ceramic coating','Mercedes-AMG GLE headlight and fender after ceramic coating, garage reflected in the paint']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('surveyor-travel-trailer','rv','Surveyor travel trailer','Gelcoat oxidation removal','Calgary',2,20,ARRAY['jobs/rv-surveyor-tape-line.webp','jobs/rv-surveyor-storage-lot.webp','jobs/rv-surveyor-side.webp','gallery-rv-surveyor-front.jpg','gallery-rv-surveyor-full.jpg']::text[],ARRAY['Surveyor travel trailer front cap with a tape line showing corrected versus oxidized gelcoat','Surveyor travel trailer at a Calgary storage lot during gelcoat restoration','Surveyor travel trailer side profile at the storage lot','Surveyor travel trailer front cap during oxidation correction','Surveyor travel trailer front cap full view during paint correction']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('cat-320-excavator','fleet','CAT 320 excavator','On-site wash + cab interior','Calgary',3,30,ARRAY['jobs/fleet-cat-job-site.webp','jobs/fleet-cat-320-site.webp','jobs/fleet-cat-boom.webp','jobs/fleet-cat-cab-door.webp','jobs/fleet-cat-seat.webp','jobs/fleet-cat-cab-floor.webp','gallery-cat-excavator-pedals.jpg']::text[],ARRAY['CAT excavator on a Calgary job site after wash','CAT 320 excavator on site after wash','CAT excavator boom and bucket after wash','CAT excavator cab door open after interior clean','CAT excavator operator seat after cleaning','CAT excavator cab floor and seat after detail','Spotless CAT excavator floor pedals and cab interior after detail']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('bmw-m340i','ceramic_ppf','BMW M340i','Paint correction + ceramic coating',NULL,NULL,40,ARRAY['jobs/exterior-bmw-m340i-front.webp','jobs/ceramic-bmw-m340i-hood.webp','jobs/ceramic-bmw-m340i-door.webp','gallery-26.jpg','gallery-28.jpg','jobs/wheels-bmw-m340i-caliper.webp']::text[],ARRAY['Blue BMW M340i in the shop after paint correction and ceramic coating','Blue BMW M340i hood and headlight gloss after correction','Blue BMW M340i door reflection after paint correction','Blue BMW M340i with deep gloss under studio lighting after ceramic coating','Blue BMW M340i rear view with glowing taillights after ceramic coating','BMW M340i wheel with blue M caliper and dressed Michelin tire']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('newmar-dutch-star','rv','Newmar Dutch Star diesel pusher','Full exterior detail + polish',NULL,NULL,50,ARRAY['jobs/rv-newmar-bay-side.webp','gallery-newmar-dutch-star-front.jpg','gallery-newmar-headlights.jpg','jobs/rv-newmar-wheels.webp','jobs/rv-newmar-mirror.webp','gallery-newmar-dutch-star-badge.jpg']::text[],ARRAY['Newmar Dutch Star motorhome in a service bay during exterior detail','Newmar Dutch Star diesel pusher front view after full exterior detail','Newmar Dutch Star headlights and front cap with mirror gloss after polish','Newmar Dutch Star polished aluminum wheels after detail','Chrome mirror on a Newmar Dutch Star after polish','Newmar Dutch Star side badge and paint after exterior polish']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('cadillac-srx','car','Cadillac SRX','Interior + exterior detail','Calgary',NULL,60,ARRAY['jobs/exterior-cadillac-srx-driveway.webp','jobs/interior-cadillac-srx-front-cabin.webp','jobs/interior-cadillac-srx-dash.webp','jobs/interior-cadillac-srx-rear-seats.webp','jobs/interior-cadillac-srx-door.webp']::text[],ARRAY['White Cadillac SRX front view after exterior detail','Cadillac SRX cream leather front cabin after interior detail','Cadillac SRX dashboard and console after interior detail','Cadillac SRX rear seats after interior detail','Cadillac SRX door panel after interior detail']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('dirtt-transit-vans','fleet','Ford Transit fleet vans','On-site fleet cleaning',NULL,NULL,70,ARRAY['jobs/fleet-dirtt-transit-onsite.webp','jobs/fleet-dirtt-vans-lot.webp']::text[],ARRAY['Ford Transit fleet van during on-site cleaning','Fleet vans at a company lot after on-site washes']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('ford-f150','car','Ford F-150','Interior detail',NULL,NULL,80,ARRAY['jobs/interior-f150-front-seats.webp','jobs/interior-f150-cabin.webp','jobs/interior-f150-console.webp','jobs/interior-f150-rear.webp','jobs/interior-f150-rear-floor.webp']::text[],ARRAY['Ford F-150 front seats and floor after interior detail','Ford F-150 cabin after interior detail','Ford F-150 console after interior detail','Ford F-150 rear seat after interior detail','Ford F-150 rear floor with the bench flipped up after vacuum and shampoo']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('sunchaser-pontoon','marine','SunChaser pontoon','Full marine detail',NULL,NULL,90,ARRAY['gallery-sunchaser-pontoon.jpg','gallery-sunchaser-pontoon-side.jpg','gallery-sunchaser-pontoon-interior.jpg','jobs/marine-sunchaser-deck.webp','jobs/marine-sunchaser-logo.webp','jobs/marine-mercury-outboard.webp']::text[],ARRAY['SunChaser pontoon boat on its trailer after exterior detail','SunChaser pontoon blue side panels and logs after polish','SunChaser pontoon boat deck and vinyl seating after interior detail','SunChaser pontoon deck and bimini after detail','SunChaser logo close-up after polish','Mercury 150 outboard motor after cleaning']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('range-rover','car','Range Rover','Interior + exterior detail','Calgary',NULL,100,ARRAY['jobs/exterior-range-rover-front.webp','jobs/exterior-range-rover-three-quarter.webp','jobs/interior-range-rover-front-cabin.webp','jobs/interior-range-rover-rear-bench.webp','jobs/wheels-range-rover-wheel.webp']::text[],ARRAY['Green Range Rover front in the driveway after detail','Green Range Rover front three-quarter after detail','Range Rover front cabin after interior detail','Range Rover tan leather rear bench after detail','Range Rover wheel and fender after detail']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('flagstaff-travel-trailer','rv','Flagstaff travel trailer','Gelcoat correction',NULL,NULL,110,ARRAY['jobs/rv-flagstaff-test-sections.webp','gallery-flagstaff-trailer-correction.jpg','jobs/rv-flagstaff-graphics.webp','gallery-flagstaff-trailer-side.jpg']::text[],ARRAY['Flagstaff travel trailer with tape lines marking polish test sections','Flagstaff travel trailer with tape lines marking a fiberglass correction test spot','Close-up of Flagstaff trailer graphics during polishing','Flagstaff Signature travel trailer side profile after wash and polish']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('acura-dealership','fleet','Acura dealership inventory','Dealership lot prep','Calgary',NULL,120,ARRAY['jobs/dealership-acura-white-lot.webp','jobs/dealership-acura-blue-lineup.webp','jobs/dealership-acura-rdx-lot.webp','jobs/dealership-acura-red-seats.webp','jobs/dealership-acura-third-row.webp','jobs/dealership-acura-engine-bay.webp']::text[],ARRAY['White Acura on the dealership lot after prep detail','Blue Acura lineup at the dealership after detail','Grey Acura RDX on the lot after detail','Acura red leather sport seats after dealership interior detail','Acura third-row seats and cargo area after dealership prep','Acura engine bay after dealership prep']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('bmw-2-series-convertible','car','BMW 2 Series convertible','Interior detail',NULL,NULL,130,ARRAY['jobs/interior-bmw-red-front-seats.webp','jobs/interior-bmw-red-driver-side.webp','jobs/interior-bmw-red-rear-seats.webp','gallery-bmw-rear.jpg']::text[],ARRAY['BMW 2 Series convertible red leather front seats after interior detail','BMW 2 Series convertible red leather cabin and dash after interior detail','BMW red leather rear seats after interior detail','BMW 2-Series convertible rear three-quarter view freshly detailed']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('kodiak-travel-trailer','rv','Kodiak Ultra-Lite travel trailer','RV exterior detail',NULL,NULL,140,ARRAY['jobs/rv-kodiak-front.webp','jobs/rv-kodiak-side.webp','jobs/wheels-kodiak-wheels.webp']::text[],ARRAY['Kodiak travel trailer front cap after exterior detail','Kodiak travel trailer side after wash and polish','Kodiak travel trailer fenders and wheels after dressing']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('hurricane-motorhome','rv','Hurricane motorhome','Oxidation removal + exterior detail',NULL,NULL,150,ARRAY['gallery-hurricane-side.jpg','gallery-hurricane-front.jpg','gallery-hurricane-head-on.jpg','gallery-hurricane-rear.jpg']::text[],ARRAY['Hurricane RV full side profile after oxidation removal and detail','Hurricane motorhome front view after full exterior detail','Hurricane RV head-on view after professional wash and detail','Hurricane motorhome rear view freshly detailed']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names'),
('audi-a4','car','Audi A4','Exterior detail','Calgary',NULL,160,ARRAY['jobs/exterior-audi-a4-driveway.webp','gallery-audi-a4.jpg','gallery-audi-a4-reflection.jpg','jobs/wheels-audi-a4-wheel.webp']::text[],ARRAY['Black Audi A4 in a Calgary driveway after exterior detail','Black Audi A4 with glossy finish after exterior detail','Black Audi A4 taillight and quarter panel reflecting like a mirror after polish','Audi A4 wheel and dressed tire after wheel detail']::text[],'TODO: confirm package name; add price paid, time on site, city and crew first names')
ON CONFLICT (slug) DO NOTHING;

-- Example openings, switched off. Set active = true and real times to show the strip.
INSERT INTO public.next_openings (starts_at, location, scope, active)
SELECT * FROM (VALUES
  ((date_trunc('day', now() AT TIME ZONE 'America/Edmonton') + interval '2 days 10 hours') AT TIME ZONE 'America/Edmonton', 'Airdrie shop', 'all', false),
  ((date_trunc('day', now() AT TIME ZONE 'America/Edmonton') + interval '3 days 13 hours') AT TIME ZONE 'America/Edmonton', 'Calgary mobile', 'all', false)
) AS v(starts_at, location, scope, active)
WHERE NOT EXISTS (SELECT 1 FROM public.next_openings);
