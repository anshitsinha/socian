import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI; // Add your MongoDB connection string in .env.local
const client = new MongoClient(uri);
let db;

export async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db('schoolDB'); // Replace 'schoolDB' with your database name
  }
  return db;
}
