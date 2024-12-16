import { connectToDB } from '@/db';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET; // Replace with a secure key
const adminEmail = 'admin@example.com'; // Hardcoded admin email
const adminPassword = 'admin123'; // Hardcoded admin password

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    // Check if the credentials match the admin
    if (email === adminEmail && password === adminPassword) {
      // Generate a JWT token for the admin
      const token = jwt.sign({ email, role: 'admin' }, secretKey, { expiresIn: '1h' });

      // Fetch all student data
      const db = await connectToDB();
      const studentsCollection = db.collection('students');
      const students = await studentsCollection.find().toArray();

      return new Response(
        JSON.stringify({ token, students }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Invalid admin credentials' }),
      { status: 401 }
    );
  } catch (error) {
    console.error('Error during admin login:', error.message);
    return new Response(
      JSON.stringify({ message: 'Server error', error: error.message }),
      { status: 500 }
    );
  }
}
