import { createEmailWorker } from '../config/bullmq';
import { categorizeEmail } from '../services/categorizeEmail';
import { generateResponse } from '../services/generateResponse';
import { sendGmailResponse } from '../services/emailService';
const emailProcessor = async (job:any) => {
  const { emailContent, emailProvider, auth } = job.data;

  const category = await categorizeEmail(emailContent);
  const responseContent = await generateResponse(category);

  if (emailProvider === 'gmail') {
    await sendGmailResponse(auth, responseContent);
  }
};

createEmailWorker(emailProcessor);
