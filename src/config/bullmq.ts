import { Queue, Worker } from 'bullmq';
import dotenv from 'dotenv';
dotenv.config();
const connection = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
};


const emailQueue = new Queue('emailQueue', { connection });
const fetchEmailQueue = new Queue('fetchEmailQueue', { connection });

function createEmailWorker(processor:any) {
  new Worker('emailQueue', processor, { connection });
}

function createFetchEmailWorker(processor :any) {

  new Worker('fetchEmailQueue', processor, { connection });
}

export { emailQueue, fetchEmailQueue, createEmailWorker, createFetchEmailWorker };
