import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const data = await request.json();
  const { club } = data;

  const clubsPath = path.join(process.cwd(), 'db', 'clubs.json');
  const studentsPath = path.join(process.cwd(), 'db', 'students.json');

  const clubsData = JSON.parse(fs.readFileSync(clubsPath, 'utf8'));
  const students = JSON.parse(fs.readFileSync(studentsPath, 'utf8'));

  const memberIds = clubsData[club];
  const members = students.filter(student => memberIds.includes(student.id));

  return new Response(JSON.stringify(members), { status: 200 });
}
