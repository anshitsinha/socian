import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';  // Import bcrypt

const secretKey = process.env.JWT_SECRET;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri || !secretKey) {
  throw new Error('Environment variables MONGO_URI and JWT_SECRET must be defined.');
}

let client;
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(mongoUri);
    await client.connect();
  }
  return client.db(); // Return the connected database
}

export async function POST(req) {
  const { email, password } = await req.json();
  console.log('Received email:', email, 'Received password:', password);

  try {
    const db = await connectToDatabase();

    // Check if user is a student
    const student = await db.collection('students').findOne({ email });
    console.log('Student found:', student);

    if (student && await bcrypt.compare(password, student.password)) {
      const token = jwt.sign({ type: 'student', user: student }, secretKey);
      return new Response(JSON.stringify({ token }), { status: 200 });
    }

    // Check if user is a teacher (similar logic can be applied)
    const teacher = await db.collection('teachers').findOne({ email });
    console.log('Teacher found:', teacher);

    if (teacher && await bcrypt.compare(password, teacher.password)) {
      const token = jwt.sign({ type: 'teacher', user: teacher }, secretKey);
      return new Response(JSON.stringify({ token }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
      status: 400,
    });
  } catch (error) {
    console.error('Error during authentication:', error.message);
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), {
      status: 500,
    });
  }
}
