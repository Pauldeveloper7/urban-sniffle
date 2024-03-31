// api/signup.js

import { MongoClient } from 'mongodb';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'uploads');

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      const { username, email } = fields;
      const photo = files.photo;

      // Connect to MongoDB
      const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      try {
        await client.connect();

        const db = client.db(process.env.MONGODB_DB);
        const collection = db.collection('users');

        // Save user data to MongoDB
        const result = await collection.insertOne({
          username,
          email,
          // Save photo path or binary data to MongoDB based on your preference
        });

        console.log('User data saved:', result.ops[0]);

        // Close MongoDB connection
        await client.close();

        // Save the uploaded photo to a designated directory
        const photoPath = path.join(process.cwd(), 'uploads', photo.name);
        fs.renameSync(photo.path, photoPath);

        // Respond with success message
        res.status(200).json({ message: 'User data saved successfully' });
      } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({ error: 'Failed to save user data' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
