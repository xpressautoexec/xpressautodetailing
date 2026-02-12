import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { record } = await req.json();
    const { name, email, phone, message, form_type, company_name, created_at } = record;

    const formLabel = form_type === 'fleet' ? 'Fleet/Corporate Inquiry' :
                      form_type === 'training' ? 'Training Registration' : 'General Contact';

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">New ${formLabel} Submission</h2>
        <hr style="border: 1px solid #eee;" />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company_name ? `<p><strong>Company:</strong> ${company_name}</p>` : ''}
        <p><strong>Form Type:</strong> ${formLabel}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 12px; border-radius: 6px;">
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <hr style="border: 1px solid #eee; margin-top: 20px;" />
        <p style="color: #888; font-size: 12px;">Submitted at ${new Date(created_at).toLocaleString('en-CA', { timeZone: 'America/Edmonton' })}</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Xpress Auto Detailing <noreply@xpressautodetail.ca>',
        to: ['xpressautoexec@gmail.com'],
        subject: `New ${formLabel}: ${name}`,
        html: htmlBody,
        reply_to: email,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
