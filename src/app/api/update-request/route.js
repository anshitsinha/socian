import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const { studentId, action, club } = await request.json();

  const studentsPath = path.join(process.cwd(), 'db', 'students.json');
  const clubsPath = path.join(process.cwd(), 'db', 'clubs.json');

  const students = JSON.parse(fs.readFileSync(studentsPath, 'utf8'));
  const clubs = JSON.parse(fs.readFileSync(clubsPath, 'utf8'));

  const student = students.find(s => s.id === studentId);

  if (!student) return new Response(JSON.stringify({ message: 'Student not found' }), { status: 404 });

  if (action === 'add') {
    student.clubs.push(club);
    clubs[club].pending.push(studentId);
  } else if (action === 'remove') {
    student.clubs = student.clubs.filter(c => c !== club);
    clubs[club].pending = clubs[club].pending.filter(id => id !== studentId);
  }

  fs.writeFileSync(studentsPath, JSON.stringify(students, null, 2));
  fs.writeFileSync(clubsPath, JSON.stringify(clubs, null, 2));

  return new Response(JSON.stringify({ message: 'Request updated' }), { status: 200 });
}
