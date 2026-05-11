
-- Revoke public execute on SECURITY DEFINER helper functions
REVOKE EXECUTE ON FUNCTION public.get_notify_contact_secret() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_contact_submission() FROM PUBLIC, anon, authenticated;

-- Only service_role needs to call get_notify_contact_secret (from edge function)
GRANT EXECUTE ON FUNCTION public.get_notify_contact_secret() TO service_role;

-- notify_contact_submission is a trigger function; no role needs direct EXECUTE
