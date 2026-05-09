import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-notify-secret, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const esc = (s: unknown): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify shared secret — only the DB trigger should be able to call this
    const providedSecret = req.headers.get('x-notify-secret');
    if (!providedSecret) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      console.error('Supabase env vars not configured');
      return new Response(JSON.stringify({ success: false, error: 'Internal error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch expected secret from vault via private RPC
    const secretRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_notify_contact_secret`, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    });

    if (!secretRes.ok) {
      console.error('Failed to fetch notify secret:', secretRes.status);
      return new Response(JSON.stringify({ success: false, error: 'Internal error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const expectedSecret = await secretRes.json();
    // Constant-time-ish comparison
    if (typeof expectedSecret !== 'string' || expectedSecret.length === 0 || providedSecret !== expectedSecret) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return new Response(JSON.stringify({ success: false, error: 'Notification failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { record } = await req.json();
    const { name, email, phone, message, form_type, company_name, created_at } = record ?? {};

    const formLabel = form_type === 'fleet' ? 'Fleet/Corporate Inquiry' :
                      form_type === 'training' ? 'Training Registration' : 'General Contact';

    const safeName = esc(name);
    const safeEmail = esc(email);
    const safePhone = esc(phone);
    const safeMessage = esc(message);
    const safeCompany = esc(company_name);
    const safeFormLabel = esc(formLabel);

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">New ${safeFormLabel} Submission</h2>
        <hr style="border: 1px solid #eee;" />
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${phone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
        ${company_name ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ''}
        <p><strong>Form Type:</strong> ${safeFormLabel}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 12px; border-radius: 6px;">
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
        <hr style="border: 1px solid #eee; margin-top: 20px;" />
        <p style="color: #888; font-size: 12px;">Submitted at ${esc(new Date(created_at).toLocaleString('en-CA', { timeZone: 'America/Edmonton' }))}</p>
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
        subject: `New ${formLabel}: ${name ?? 'Unknown'}`,
        html: htmlBody,
        reply_to: typeof email === 'string' ? email : undefined,
      }),
    });

    if (!res.ok) {
      const data = await res.text();
      console.error(`Resend API error [${res.status}]:`, data);
      return new Response(JSON.stringify({ success: false, error: 'Notification failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
