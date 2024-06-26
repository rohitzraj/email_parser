import { google } from 'googleapis';

async function sendGmailResponse(auth:any, emailContent: string) {
  const gmail = google.gmail({ version: 'v1', auth });
  const message = createEmailMessage(emailContent);

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: message,
    },
  });
}

function createEmailMessage(content: string): string {
  return Buffer.from(
    `To: recipient@example.com\nSubject: Re: Your Inquiry\n\n${content}`
  ).toString('base64');
}

export { sendGmailResponse };
