
-- Enable pg_net for HTTP calls from database
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create function to call edge function on new contact submission
CREATE OR REPLACE FUNCTION public.notify_contact_submission()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://ifdkpmtnybzmxhtbzeae.supabase.co/functions/v1/notify-contact',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmZGtwbXRueWJ6bXhodGJ6ZWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0OTkyNTAsImV4cCI6MjA4NjA3NTI1MH0.0R7c_2C2YXld-0x6iIHFcQ6zX_h7w_UnOdtTh-WI4Eo'
    ),
    body := jsonb_build_object('record', row_to_json(NEW))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on contact_submissions
CREATE TRIGGER on_contact_submission_notify
AFTER INSERT ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.notify_contact_submission();
