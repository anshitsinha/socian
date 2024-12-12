import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const studentsFilePath = path.join(process.cwd(), 'db', 'students.json');

// Ensure studentsData is correctly loaded
let studentsData = [];

// Initialize studentsData from the file if it exists
if (fs.existsSync(studentsFilePath)) {
  try {
    studentsData = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
  } catch (err) {
    console.error('Error reading students data:', err);
  }
}

export async function POST(req) {
  const { email, password, name, regNo, progOfStudy, school, center, mobNo, date, clubs } = await req.json(); // Get clubs and other data from the request

  // Check if the email already exists
  const existingStudent = studentsData.find((s) => s.email === email);
  if (existingStudent) {
    return new Response(JSON.stringify({ message: 'Email already exists' }), { status: 400 });
  }

  // Add the new student to the data
  const newStudent = {
    email,
    password,
    name,
    regNo,
    progOfStudy,
    school,
    center,
    mobNo,
    date,
    clubs: clubs || [],
  };
  studentsData.push(newStudent);

  // Write the updated data back to the file
  try {
    fs.writeFileSync(studentsFilePath, JSON.stringify(studentsData, null, 2));
  } catch (err) {
    console.error('Error writing to students file:', err);
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
