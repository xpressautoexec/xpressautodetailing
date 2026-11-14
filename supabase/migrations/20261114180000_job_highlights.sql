-- Job receipts: optional "Package included" lines, plus updated write-ups for the
-- SunChaser pontoon and the BMW 2 Series convertible.

ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS highlights TEXT[] NOT NULL DEFAULT '{}';

UPDATE public.jobs SET
  package_name = 'Detail + paint correction + aluminum polish + ceramic coating',
  photo_alts[1] = 'SunChaser pontoon boat on its trailer after detail, paint correction, aluminum polish and ceramic coating',
  highlights = ARRAY[
    'Full detail: hull, deck, seating and trailer',
    'Paint correction: oxidation and swirls removed',
    'Aluminum polish: tubes and rails brought back to a bright finish',
    'Ceramic coating: easier cleaning, resists water spots, UV and grime'
  ]::text[]
WHERE slug = 'sunchaser-pontoon';

UPDATE public.jobs SET
  category = 'ceramic_ppf',
  package_name = 'Paint correction + ceramic coating',
  photos = ARRAY[
    'gallery-bmw-rear.jpg',
    'jobs/interior-bmw-red-front-seats.webp',
    'jobs/interior-bmw-red-driver-side.webp',
    'jobs/interior-bmw-red-rear-seats.webp'
  ]::text[],
  photo_alts = ARRAY[
    'BMW 2 Series convertible rear three-quarter view after paint correction and ceramic coating',
    'BMW 2 Series convertible red leather front seats',
    'BMW 2 Series convertible red leather cabin and dash',
    'BMW 2 Series convertible red leather rear seats'
  ]::text[],
  highlights = ARRAY[
    'Multi-stage paint correction: swirls and light scratches removed, gloss restored',
    'Ceramic coating: long-lasting protection with water beading',
    'Quicker maintenance washes and better UV and chemical resistance'
  ]::text[]
WHERE slug = 'bmw-2-series-convertible';
