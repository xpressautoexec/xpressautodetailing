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

    // Send branded auto-reply confirmation to the customer
    if (typeof email === 'string' && email.includes('@')) {
      const firstName = typeof name === 'string' ? esc(name.split(' ')[0]) : 'there';
      const isTraining = form_type === 'training';
      const isFleet = form_type === 'fleet';

      const ctaLine = isTraining
        ? "We've received your training registration and our team will reach out within a few hours to confirm your spot and next steps."
        : isFleet
        ? "We've received your fleet inquiry. Our team will reach out within a few hours with a tailored quote and scheduling options."
        : "We've received your message and our team will get back to you within a few hours (typically much sooner during business hours).";

      const autoReplyHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%); padding: 28px 24px; text-align: center;">
            <img src="https://xpressautodetail.ca/xpress-logo.png" alt="Xpress Auto & RV Detailing" width="260" style="display: inline-block; max-width: 260px; height: auto; margin: 0 auto;" />
            <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Calgary's 4.9-Star Mobile Detailers</p>
          </div>
          <div style="padding: 32px 28px;">
            <h2 style="color: #0F172A; font-size: 20px; margin: 0 0 16px;">Thanks, ${firstName}!</h2>
            <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">${ctaLine}</p>
            <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">Here's a copy of what you sent us:</p>
            <div style="background: #F1F5F9; border-left: 4px solid #2563EB; padding: 16px 18px; border-radius: 6px; margin-bottom: 28px;">
              <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
            </div>
            <div style="text-align: center; margin: 28px 0;">
              <a href="https://xpressauto.fieldd.co/" style="display: inline-block; background: #2563EB; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 32px; border-radius: 8px; text-transform: uppercase; letter-spacing: 1px;">Book Online Now</a>
            </div>
            <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 24px 0 8px;"><strong>Need us sooner?</strong></p>
            <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0 0 4px;">📞 <a href="tel:5875004523" style="color: #2563EB; text-decoration: none; font-weight: 600;">587-500-4523</a></p>
            <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">✉️ <a href="mailto:support@xpressautodetail.ca" style="color: #2563EB; text-decoration: none; font-weight: 600;">support@xpressautodetail.ca</a></p>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-top: 24px;">
              <p style="color: #0F172A; font-size: 13px; font-weight: 700; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.5px;">The Xpress Pass — Satisfaction Guarantee</p>
              <p style="color: #475569; font-size: 13px; line-height: 1.5; margin: 0;">If you're not 100% happy with the result, we'll make it right. That's our promise.</p>
            </div>
          </div>
          <div style="background: #0F172A; padding: 20px 24px; text-align: center;">
            <p style="color: #94A3B8; font-size: 12px; margin: 0;">Serving Calgary, Airdrie, Cochrane, Chestermere & area</p>
            <p style="color: #64748B; font-size: 11px; margin: 6px 0 0;">© ${new Date().getFullYear()} Xpress Auto Detailing</p>
          </div>
        </div>
      `;

      const replySubject = isTraining
        ? "We received your training registration — Xpress Auto Detailing"
        : isFleet
        ? "We received your fleet inquiry — Xpress Auto Detailing"
        : "Thanks for reaching out — Xpress Auto Detailing";

      const replyRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Xpress Auto Detailing <support@xpressautodetail.ca>',
          to: [email],
          subject: replySubject,
          html: autoReplyHtml,
          reply_to: 'support@xpressautodetail.ca',
        }),
      });

      if (!replyRes.ok) {
        const data = await replyRes.text();
        console.error(`Auto-reply send failed [${replyRes.status}]:`, data);
        // Don't fail the whole request — internal notification already sent
      }
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
