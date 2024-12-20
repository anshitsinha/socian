import { connectToDB } from '@/db';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export async function GET(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized: No token provided' }),
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, secretKey);
      if (decoded.role !== 'admin') {
        return new Response(
          JSON.stringify({ message: 'Unauthorized: Invalid role' }),
          { status: 401 }
        );
      }

      // Token is valid, fetch students data
      const db = await connectToDB();
      const studentsCollection = db.collection('students');
      const students = await studentsCollection.find().toArray();

      return new Response(JSON.stringify(students), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized: Invalid token' }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error fetching students:', error.message);
    return new Response(
      JSON.stringify({ message: 'Server Error' }),
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized: No token provided' }),
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, secretKey);
      if (decoded.role !== 'admin') {
        return new Response(
          JSON.stringify({ message: 'Unauthorized: Invalid role' }),
          { status: 401 }
        );
      }

      const body = await request.json();
      const { emails } = body;

      if (!emails || !emails.length) {
        return new Response(
          JSON.stringify({ message: 'Bad Request: No emails provided' }),
          { status: 400 }
        );
      }

      // Token is valid, delete the students
      const db = await connectToDB();
      const studentsCollection = db.collection('students');
      const result = await studentsCollection.deleteMany({ email: { $in: emails } });

      return new Response(
        JSON.stringify({ message: `${result.deletedCount} student(s) deleted successfully` }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized: Invalid token' }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error deleting students:', error.message);
    return new Response(
      JSON.stringify({ message: 'Server Error' }),
      { status: 500 }
    );
  }
}
