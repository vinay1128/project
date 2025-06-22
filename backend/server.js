import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './src/db.js';
import resumesRouter from './src/routes/resumes.js';

dotenv.config();



const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

connectDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    app.use('/api/resumes', resumesRouter);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
