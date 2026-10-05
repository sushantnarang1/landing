import { MockEmailProvider } from './provider';

export async function checkEnquiriesJob() {
  console.log('[Cron] Checking for new enquiries...');
  
  // In a real app, we'd query the DB/Google Sheet
  const mockEnquiries = [
    { name: 'Jane Doe', company: 'TechCorp', email: 'jane@techcorp.com', message: 'Interested in early access' },
  ];

  if (mockEnquiries.length === 0) {
    console.log('[Cron] No new enquiries found.');
    return;
  }

  const provider = new MockEmailProvider();
  for (const enquiry of mockEnquiries) {
    await provider.sendEmail({
      to: 'sushantnarang@narangconsulting.com',
      from: 'narangos-cron@narangos.com',
      subject: `Weekly Enquiry Summary: ${enquiry.company}`,
      body: `Weekly check: New enquiry from ${enquiry.name} (${enquiry.email}).\n\nMessage: ${enquiry.message}`,
    });
  }
  
  console.log(`[Cron] Notified admin of ${mockEnquiries.length} new enquiries.`);
}
