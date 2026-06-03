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

      const headlineText = isTraining
        ? "Your training registration is in"
        : isFleet
        ? "Your fleet inquiry is in"
        : "Your message is in good hands";

      const nextStepsRows = isTraining
        ? [
            { n: "1", t: "Confirmation call", d: "We'll reach out within a few hours to confirm your course date and answer any questions." },
            { n: "2", t: "Pre-course materials", d: "You'll get a welcome kit with what to bring, what to expect, and how to prep." },
            { n: "3", t: "Show up & learn", d: "Hands-on training with the same tools and techniques we use on every job." },
          ]
        : isFleet
        ? [
            { n: "1", t: "Discovery call", d: "Quick chat to understand your fleet size, vehicle types, and service cadence." },
            { n: "2", t: "Custom quote", d: "Tailored pricing built around your schedule, locations, and volume." },
            { n: "3", t: "Onboarding & first detail", d: "We coordinate logistics and get your fleet looking sharp — fast." },
          ]
        : [
            { n: "1", t: "We review your request", d: "A real human reads every message — usually within minutes during business hours." },
            { n: "2", t: "We reply with a quote or answer", d: "Expect a personal reply with pricing, availability, or whatever info you need." },
            { n: "3", t: "We come to you", d: "Pick a time that works — we bring water, power, and everything else." },
          ];

      const stepsHtml = nextStepsRows.map((s) => `
        <tr>
          <td valign="top" width="44" style="padding: 0 14px 18px 0;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #2563EB; color: #ffffff; font-weight: 800; font-size: 14px; line-height: 36px; text-align: center;">${s.n}</div>
          </td>
          <td valign="top" style="padding: 0 0 18px 0;">
            <p style="color: #0F172A; font-size: 14px; font-weight: 700; margin: 4px 0 4px;">${s.t}</p>
            <p style="color: #475569; font-size: 13px; line-height: 1.55; margin: 0;">${s.d}</p>
          </td>
        </tr>
      `).join('');

      const autoReplyHtml = `
        <div style="background: #F1F5F9; padding: 24px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
          <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 24px rgba(15,23,42,0.08);">

            <div style="background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 55%, #3B82F6 100%); padding: 32px 28px; text-align: center;">
              <img src="https://xpressautodetail.ca/xpress-logo-white.png" alt="Xpress Auto &amp; RV Detailing" width="240" style="display: inline-block; max-width: 240px; height: auto; margin: 0 auto 14px;" />
              <p style="color: #DBEAFE; margin: 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">Calgary &middot; Airdrie &middot; Cochrane &middot; Chestermere</p>
            </div>

            <div style="padding: 28px 32px 0; text-align: center;">
              <span style="display: inline-block; background: #DCFCE7; color: #15803D; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 14px; border-radius: 999px;">&#10003; Message received</span>
            </div>

            <div style="padding: 18px 32px 8px; text-align: center;">
              <h1 style="color: #0F172A; font-size: 26px; font-weight: 800; margin: 0 0 8px; line-height: 1.25;">Thanks, ${firstName}.</h1>
              <p style="color: #0F172A; font-size: 18px; font-weight: 600; margin: 0 0 14px;">${headlineText}.</p>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 auto; max-width: 460px;">${ctaLine}</p>
            </div>

            <div style="padding: 28px 32px 4px;">
              <p style="color: #64748B; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 10px;">Your message</p>
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #2563EB; padding: 18px 20px; border-radius: 8px;">
                <p style="color: #334155; font-size: 14px; line-height: 1.65; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
              </div>
            </div>

            <div style="padding: 28px 32px 8px;">
              <p style="color: #64748B; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 16px;">What happens next</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
                ${stepsHtml}
              </table>
            </div>

            <div style="padding: 8px 32px 28px; text-align: center;">
              <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">Want to lock in a time right now?</p>
              <a href="https://xpressauto.fieldd.co/" style="display: inline-block; background: #2563EB; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 14px; padding: 16px 36px; border-radius: 10px; text-transform: uppercase; letter-spacing: 1.2px; box-shadow: 0 6px 16px rgba(37,99,235,0.35);">Book Online &rarr;</a>
              <p style="color: #94A3B8; font-size: 12px; margin: 14px 0 0;">60-second booking &middot; Pick your time &middot; We come to you</p>
            </div>

            <div style="padding: 0 32px;"><div style="height: 1px; background: #E2E8F0;"></div></div>

            <div style="padding: 24px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; text-align: center;">
                <tr>
                  <td width="33%" style="padding: 0 6px;">
                    <p style="color: #2563EB; font-size: 22px; font-weight: 800; margin: 0;">4.9&#9733;</p>
                    <p style="color: #64748B; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; margin: 4px 0 0;">Google rating</p>
                  </td>
                  <td width="33%" style="padding: 0 6px; border-left: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0;">
                    <p style="color: #2563EB; font-size: 22px; font-weight: 800; margin: 0;">1000+</p>
                    <p style="color: #64748B; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; margin: 4px 0 0;">Vehicles detailed</p>
                  </td>
                  <td width="33%" style="padding: 0 6px;">
                    <p style="color: #2563EB; font-size: 22px; font-weight: 800; margin: 0;">&lt; 2 hr</p>
                    <p style="color: #64748B; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; margin: 4px 0 0;">Reply time</p>
                  </td>
                </tr>
              </table>
            </div>

            <div style="padding: 0 32px 28px;">
              <div style="background: #0F172A; border-radius: 12px; padding: 22px 24px; text-align: center;">
                <p style="color: #94A3B8; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 10px;">Need us sooner?</p>
                <p style="margin: 0 0 4px;">
                  <a href="tel:5875004523" style="color: #ffffff; font-size: 22px; font-weight: 800; text-decoration: none; letter-spacing: 0.5px;">587-500-4523</a>
                </p>
                <p style="margin: 0;">
                  <a href="mailto:support@xpressautodetail.ca" style="color: #93C5FD; font-size: 13px; text-decoration: none;">support@xpressautodetail.ca</a>
                </p>
                <p style="color: #64748B; font-size: 12px; margin: 12px 0 0;">Open daily 9 AM &ndash; 5 PM</p>
              </div>
            </div>

            <div style="padding: 0 32px 32px;">
              <div style="border: 1.5px solid #DBEAFE; background: linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%); border-radius: 12px; padding: 20px 22px;">
                <p style="color: #1E3A8A; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 8px;">The Xpress Pass</p>
                <p style="color: #0F172A; font-size: 15px; font-weight: 700; margin: 0 0 6px;">100% Satisfaction Promise</p>
                <p style="color: #475569; font-size: 13px; line-height: 1.6; margin: 0;">If you're not thrilled with the result, we'll come back and make it right &mdash; no questions, no extra charge.</p>
              </div>
            </div>

            <div style="background: #0F172A; padding: 24px 28px; text-align: center;">
              <p style="color: #E2E8F0; font-size: 13px; font-weight: 600; margin: 0 0 6px;">Xpress Auto &amp; RV Detailing</p>
              <p style="color: #94A3B8; font-size: 12px; margin: 0 0 12px;">Calgary's mobile detailers &middot; We come to you</p>
              <p style="margin: 0;">
                <a href="https://xpressautodetail.ca" style="color: #93C5FD; font-size: 12px; text-decoration: none;">xpressautodetail.ca</a>
              </p>
              <p style="color: #64748B; font-size: 11px; margin: 12px 0 0;">&copy; ${new Date().getFullYear()} Xpress Auto Detailing. All rights reserved.</p>
            </div>

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
