import { MockEmailProvider, EmailPayload } from '@/lib/email/provider';
import { apiJson, isAllowedOrigin, optionsResponse } from '@/lib/api/cors';

export function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request.headers.get('origin'))) {
    return apiJson(request, { error: 'Origin not allowed' }, 403);
  }

  try {
    const body: unknown = await request.json();
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return apiJson(request, { error: 'Invalid request body' }, 400);
    }
    
    // 1. Server-side Validation
    const { name, company, email, message, areaOfInterest } = body as Record<string, unknown>;
    if (
      typeof name !== 'string' ||
      typeof company !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !name ||
      !company ||
      !email ||
      !message
    ) {
      return apiJson(request, { error: 'Missing required fields' }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return apiJson(request, { error: 'Invalid email address' }, 400);
    }

    if (message.length > 5000) {
      return apiJson(request, { error: 'Message too long' }, 400);
    }

    // 2. Format Email
    const payload: EmailPayload = {
      to: 'sushantnarang@narangconsulting.com',
      from: 'noreply@narangos.com',
      replyTo: email,
      subject: `New NarangOS Enquiry — ${company}`,
      body: `New enquiry received from NarangOS.\n\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nArea of Interest: ${typeof areaOfInterest === 'string' ? areaOfInterest : ''}\n\nMessage:\n${message}\n\nSubmitted: ${new Date().toISOString()}\nSource: narangconsulting.com`,
    };

    // 3. Send via Provider
    const provider = new MockEmailProvider();
    const result = await provider.sendEmail(payload);

    if (!result.success) {
      throw new Error(result.error || 'Email delivery failed');
    }

    return apiJson(request, { success: true, messageId: result.messageId });

  } catch (error: unknown) {
    console.error('Contact API Error:', error);
    return apiJson(request, { error: 'Internal server error' }, 500);
  }
}
