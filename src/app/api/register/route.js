import { connectToDB } from '@/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';  // Import bcrypt

export async function POST(req) {
  const {
    email,
    password,
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

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add the new student to the database with hashed password
  const newStudent = {
    email,
    password: hashedPassword,  // Store hashed password
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
  } catch (err) {
    console.error('Error adding student to database:', err);
    return new Response(JSON.stringify({ message: 'Failed to register' }), { status: 500 });
  }

  // Create a JWT token for the new user
  const token = jwt.sign(
    {
      email: newStudent.email,
      name: newStudent.name,
      clubs: newStudent.clubs,
      regNo: newStudent.regNo,
      progOfStudy: newStudent.progOfStudy,
      school: newStudent.school,
      center: newStudent.center,
      mobNo: newStudent.mobNo,
      date: newStudent.date,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
  } else {
    console.log('JWT_SECRET is loaded successfully');
  }

  // Return the token in the response
  return new Response(JSON.stringify({ token }), { status: 201 });
}
