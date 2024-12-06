import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const { teacherId, action, studentId, club } = await request.json();

  const clubsPath = path.join(process.cwd(), 'db', 'clubs.json');

  const clubs = JSON.parse(fs.readFileSync(clubsPath, 'utf8'));

  if (action === 'approve') {
    clubs[club].approved.push(studentId);
    clubs[club].pending = clubs[club].pending.filter(id => id !== studentId);
  } else if (action === 'reject') {
    clubs[club].pending = clubs[club].pending.filter(id => id !== studentId);
  }

  fs.writeFileSync(clubsPath, JSON.stringify(clubs, null, 2));

  return new Response(JSON.stringify({ message: 'Action performed' }), { status: 200 });
}
