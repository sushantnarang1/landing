export interface EmailPayload {
  to: string;
  from: string;
  subject: string;
  body: string;
  replyTo?: string;
}

export interface EmailProvider {
  sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }>;
}

export class MockEmailProvider implements EmailProvider {
  async sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
    console.log('--- MOCK EMAIL SENT ---');
    console.log('To:', payload.to);
    console.log('Subject:', payload.subject);
    console.log('Body:', payload.body);
    console.log('----------------------');
    return { success: true, messageId: `mock_${Math.random().toString(36).substr(2, 9)}` };
  }
}

export class TransactionalEmailProvider implements EmailProvider {
  constructor(private config: { apiKey: string, fromEmail: string }) {}

  async sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
    // In production, this would call SendGrid, Postmark, or AWS SES
    // throw new Error("Production email provider not configured");
    return { success: false, error: `Email delivery is not configured for ${payload.to}` };
  }
}
