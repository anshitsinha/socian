import { connectToDB } from '@/db';

export async function GET(request) {
  try {
    // Connect to the database
    const db = await connectToDB();
    const studentsCollection = db.collection('students');

    // Fetch all students
    const students = await studentsCollection.find().toArray();

    // Return the data as a JSON response
    return new Response(JSON.stringify(students), { status: 200 });
  } catch (error) {
    console.error('Error fetching students:', error.message);
    return new Response(JSON.stringify({ message: 'Server Error' }), { status: 500 });
  }
}
