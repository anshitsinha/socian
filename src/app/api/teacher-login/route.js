import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const data = await request.json();
  const { name, regNo, program, school, contact, email, password, clubs } = data;

  const studentsPath = path.join(process.cwd(), 'db', 'students.json');
  const students = JSON.parse(fs.readFileSync(studentsPath, 'utf8'));

  const newStudent = { id: students.length + 1, name, regNo, program, school, contact, email, password, clubs };
  students.push(newStudent);

  fs.writeFileSync(studentsPath, JSON.stringify(students, null, 2));

  const clubsPath = path.join(process.cwd(), 'db', 'clubs.json');
  const clubsData = JSON.parse(fs.readFileSync(clubsPath, 'utf8'));
  clubs.forEach(club => {
    if (clubsData[club]) {
      clubsData[club].push(newStudent.id);
    }
  });
  fs.writeFileSync(clubsPath, JSON.stringify(clubsData, null, 2));

  return new Response(JSON.stringify({ message: 'Registration successful' }), { status: 201 });
}
