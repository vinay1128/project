
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db;

export async function connectDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  });
  await client.connect();
  db = client.db(); // Uses the DB name in the URI
  console.log('✅ Connected to MongoDB Atlas');
}

export function getResumesCollection() {
  return db.collection('resumes');
}
