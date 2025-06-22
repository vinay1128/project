
import { ObjectId } from 'mongodb';
import { getResumesCollection } from '../db.js';
import { Configuration, OpenAIApi } from 'openai';

// Initialize OpenAI
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// ✅ Save or update resume
export async function saveResume(req, res) {
  const resumeData = req.body;
  console.log('📥 Received resume:', resumeData);

  try {
    const collection = getResumesCollection();

    if (resumeData._id) {
      const id = new ObjectId(resumeData._id);
      delete resumeData._id;

      await collection.updateOne({ _id: id }, { $set: resumeData });
      console.log('🔄 Resume updated:', id);
      res.json({ message: 'Resume updated', _id: id.toString() });
    } else {
      const result = await collection.insertOne(resumeData);
      console.log('✅ Resume inserted:', result.insertedId);
      res.status(201).json({ message: 'Resume saved', _id: result.insertedId.toString() });
    }
  } catch (error) {
    console.error('❌ Save resume error:', error);
    res.status(500).json({ error: 'Failed to save resume' });
  }
}

// ✅ Get resume by ID
export async function getResumeById(req, res) {
  const { id } = req.params;

  try {
    const collection = getResumesCollection();
    const resume = await collection.findOne({ _id: new ObjectId(id) });

    if (!resume) return res.status(404).json({ error: 'Resume not found' });

    resume._id = resume._id.toString(); // make _id frontend-safe
    res.json(resume);
  } catch (error) {
    console.error('❌ Get resume error:', error);
    res.status(500).json({ error: 'Failed to get resume' });
  }
}

// ✅ Generate AI suggestions using OpenAI
export async function getAISuggestions(req, res) {
    const { id } = req.params;
    try {
      const collection = getResumesCollection();
      const resume = await collection.findOne({ _id: new ObjectId(id) });
  
      if (!resume) return res.status(404).json({ error: 'Resume not found' });
  
      console.log('🔍 Resume for AI:', resume);
  
      const prompt = `
  You are an expert resume advisor. Here is the resume data in JSON:
  
  ${JSON.stringify(resume, null, 2)}
  
  Please provide actionable, professional suggestions to improve this resume in bullet points.
  `;
  
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      });
  
      const suggestions = completion.data.choices[0].message.content.trim();
      console.log('✅ Suggestions:', suggestions);
      res.json({ suggestions });
  
    } catch (error) {
      console.error('❌ AI suggestion error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to get AI suggestions' });
    }
  }
  
