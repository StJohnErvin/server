import mongoose from 'mongoose';
import Response from '../models/Response';
import dbConnect from '../utils/dbConnect'; 
export default async function handler(req, res) {
  await dbConnect(); 

  if (req.method === 'GET') {
    try {
      const responses = await Response.find().sort({ createdAt: -1 });
      res.status(200).json(responses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
