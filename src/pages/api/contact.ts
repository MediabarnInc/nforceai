import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * Contact form handler. Each enquiry goes to whichever of these is configured
 * (Vercel environment variables), and counts as sent if at least one succeeds:
 *  - Email through Resend: RESEND_API_KEY and CONTACT_TO (CONTACT_FROM optional).
 *  - HubSpot, as a form submission that creates or updates a contact:
 *    HUBSPOT_PORTAL_ID (or PUBLIC_HUBSPOT_PORTAL_ID) and HUBSPOT_FORM_ID.
 *    The HubSpot form needs the fields firstname, lastname, email, company and message.
 * Swap sendEmail() for another provider if the team picks a different service.
 */

const MAX = { name: 100, email: 200, org: 200, message: 5000 };
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

async function sendEmail(data: Record<string, string>) {
  const key = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO ?? process.env.CONTACT_TO;
  const from = import.meta.env.CONTACT_FROM ?? process.env.CONTACT_FROM ?? 'nForce AI website <website@nforceai.com>';
  if (!key || !to) return { ok: false, reason: 'not-configured' as const };

  const text = [
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Organization: ${data.organization || 'Not given'}`,
    '',
    data.message,
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, reply_to: data.email, subject: `Website enquiry from ${data.firstName} ${data.lastName}`, text }),
  });
  return { ok: res.ok, reason: res.ok ? undefined : ('send-failed' as const) };
}

const env = (k: string) => (import.meta.env[k] ?? process.env[k] ?? '').toString().trim();

async function sendToHubSpot(data: Record<string, string>, request: Request) {
  const portal = env('HUBSPOT_PORTAL_ID') || env('PUBLIC_HUBSPOT_PORTAL_ID');
  const formId = env('HUBSPOT_FORM_ID');
  if (!portal || !formId) return { ok: false, reason: 'not-configured' as const };

  // The hubspotutk cookie only exists if the visitor accepted cookies. It links
  // the submission to their earlier page views in HubSpot.
  const hutk = /(?:^|;\s*)hubspotutk=([^;]+)/.exec(request.headers.get('cookie') ?? '')?.[1];
  const pageUri = request.headers.get('referer') ?? undefined;

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${encodeURIComponent(portal)}/${encodeURIComponent(formId)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: [
          { objectTypeId: '0-1', name: 'firstname', value: data.firstName },
          { objectTypeId: '0-1', name: 'lastname', value: data.lastName },
          { objectTypeId: '0-1', name: 'email', value: data.email },
          { objectTypeId: '0-1', name: 'company', value: data.organization },
          { objectTypeId: '0-1', name: 'message', value: data.message },
        ],
        context: { ...(hutk ? { hutk } : {}), ...(pageUri ? { pageUri } : {}), pageName: 'Contact' },
      }),
    },
  );
  if (!res.ok) console.error('[contact] HubSpot', res.status, await res.text().catch(() => ''));
  return { ok: res.ok, reason: res.ok ? undefined : ('send-failed' as const) };
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const reply = (status: number, body: { ok: boolean; error?: string }) =>
    wantsJson
      ? new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
      : redirect(`/contact?status=${body.ok ? 'sent' : 'error'}`, 303);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(400, { ok: false, error: 'We couldn’t read the form. Try again.' });
  }

  const get = (k: string) => String(form.get(k) ?? '').trim();
  // Honeypot: real people leave this empty.
  if (get('website')) return reply(200, { ok: true });

  const data = {
    firstName: get('firstName').slice(0, MAX.name),
    lastName: get('lastName').slice(0, MAX.name),
    email: get('email').slice(0, MAX.email),
    organization: get('organization').slice(0, MAX.org),
    message: get('message').slice(0, MAX.message),
  };

  if (!data.firstName || !data.lastName || !isEmail(data.email) || !data.message || form.get('consent') !== 'yes') {
    return reply(422, { ok: false, error: 'Fill in your name, a valid email, a message and the consent box.' });
  }

  const results = await Promise.all([
    sendEmail(data).catch((err) => { console.error('[contact] email error', err); return { ok: false, reason: 'send-failed' as const }; }),
    sendToHubSpot(data, request).catch((err) => { console.error('[contact] HubSpot error', err); return { ok: false, reason: 'send-failed' as const }; }),
  ]);
  const [email, hubspot] = results;
  if (email.reason === 'send-failed') console.error('[contact] email not sent');
  if (hubspot.reason === 'send-failed') console.error('[contact] HubSpot submission failed');
  if (!results.some((r) => r.ok)) {
    return reply(503, { ok: false, error: 'Your message wasn’t sent. Email us at contact@nforceai.com instead.' });
  }

  return reply(200, { ok: true });
};
