import { google } from 'googleapis';

async function fetchGmailMessages(auth:string) {

  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.list({ userId: "me", q: 'is:unread'});
  const messages = res.data.messages || [];
  return messages;
}


export { fetchGmailMessages};
