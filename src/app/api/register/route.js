import { connectToDB } from '@/db';

export async function POST(req) {
  const {
    email,
    name,
    regNo,
    progOfStudy,
    school,
    center,
    mobNo,
    date,
    clubs,
  } = await req.json();

  const db = await connectToDB();
  const studentsCollection = db.collection('students');

  // Check if the email already exists
  const existingStudent = await studentsCollection.findOne({ email });
  if (existingStudent) {
    return new Response(JSON.stringify({ message: 'Email already exists' }), { status: 400 });
  }

  // Add the new student to the database
  const newStudent = {
    email,
    name,
    regNo,
    progOfStudy,
    school,
    center,
    mobNo,
    date,
    clubs: clubs || [],
  };

  try {
    await studentsCollection.insertOne(newStudent);
    return new Response(JSON.stringify({ message: 'Registration successful' }), { status: 201 });
  } catch (err) {
    console.error('Error adding student to database:', err);
    return new Response(JSON.stringify({ message: 'Failed to register' }), { status: 500 });
  }
}
