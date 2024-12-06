import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const { email, password } = await request.json();

  // Load students and teachers
  const studentsPath = path.join(process.cwd(), 'db', 'students.json');
  const teachersPath = path.join(process.cwd(), 'db', 'teachers.json');

  const students = JSON.parse(fs.readFileSync(studentsPath, 'utf8'));
  const teachers = JSON.parse(fs.readFileSync(teachersPath, 'utf8'));

  // Find user in students or teachers
  const student = students.find(s => s.email === email && s.password === password);
  const teacher = teachers.find(t => t.email === email && t.password === password);

  if (student) {
    return new Response(JSON.stringify({ role: 'student', user: student }), { status: 200 });
  } else if (teacher) {
    return new Response(JSON.stringify({ role: 'teacher', user: teacher }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }
}
