import { NextResponse } from 'next/server';
import { MockEmailProvider, EmailPayload } from '@/lib/email/provider';

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
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
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
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

    return NextResponse.json({ success: true, messageId: result.messageId }, { status: 200 });

  } catch (error: unknown) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
