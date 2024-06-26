import express from 'express';
import { oauth2Client } from './config/gmail';
import { fetchEmailQueue} from './config/bullmq';

const app = express();
app.use(express.json());

// Routes for Gmail OAuth
app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'],
  });
  res.redirect(authUrl);
});

app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);
    // Store tokens securely and add a job to fetch emails
    // await emailQueue.add('fetchEmails', { emailProvider: 'gmail', auth: tokens });
    await fetchEmailQueue.add('fetchEmails', { emailProvider: 'gmail', auth: tokens });
    res.send('Google OAuth successful. You can now close this window.');
    console.log(tokens);
  } catch (error) {
    console.error('Error retrieving access token', error);
    res.status(500).send('Authentication failed');
  }
});

// Routes for Outlook OAuth

export { app };
