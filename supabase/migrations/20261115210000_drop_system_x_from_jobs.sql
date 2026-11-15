-- Xpress no longer uses System X: neutral wording on the Mercedes-AMG GLE job receipt.
UPDATE public.jobs
SET package_name = 'Paint correction + ceramic coating',
    photo_alts = array_replace(
      photo_alts,
      'White Mercedes-AMG GLE headlight after paint correction and System X ceramic coating',
      'White Mercedes-AMG GLE headlight after paint correction and ceramic coating'
    )
WHERE slug = 'mercedes-amg-gle';
