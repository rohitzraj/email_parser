import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/oauth2callback'
);

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

export { oauth2Client, gmail };
