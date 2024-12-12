import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const club = searchParams.get('club'); // Get the club from the query parameters

    // Define the file path for students data
    const studentsFilePath = path.join(process.cwd(), 'db', 'students.json');
    
    // Read the students data from the file
    const students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));

    // If a club is provided, filter students who belong to that club
    const filteredStudents = club
      ? students.filter((student) => student.clubs && student.clubs.includes(club)) // Check if club is in the clubs array
      : students;

    return new Response(JSON.stringify(filteredStudents), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server Error' }), { status: 500 });
  }
}
