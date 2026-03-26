
-- Drop the overly permissive INSERT policy
DROP POLICY "Anyone can submit contact form" ON public.contact_submissions;

-- Create a tighter INSERT policy that validates required fields are non-empty
CREATE POLICY "Public can submit contact form with valid data"
ON public.contact_submissions
FOR INSERT
TO public
WITH CHECK (
  char_length(name) > 0 AND char_length(name) <= 500
  AND char_length(email) > 0 AND char_length(email) <= 500
  AND char_length(message) > 0 AND char_length(message) <= 5000
  AND (phone IS NULL OR char_length(phone) <= 50)
  AND (company_name IS NULL OR char_length(company_name) <= 500)
);
