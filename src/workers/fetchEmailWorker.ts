import { createFetchEmailWorker } from '../config/bullmq';
import { fetchGmailMessages } from '../services/fetchEmails';
import { emailQueue } from '../config/bullmq';
import { google } from 'googleapis';

const fetchEmailProcessor = async (job:any) => {
  const { emailProvider} = job.data;

  if (emailProvider === 'gmail') {
    const auth = 'oauth2Client'
    const messages = await fetchGmailMessages(auth);
    for (const message of messages) {
      const emailContent = await getEmailContentFromGmail(auth, message.id);
      emailQueue.add('processEmail', { emailContent, emailProvider, auth });
    }
  }
};

async function getEmailContentFromGmail(auth:any, messageId:any) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.get({ userId: 'me', id: messageId });
  return res.data.snippet;
}


createFetchEmailWorker(fetchEmailProcessor);
