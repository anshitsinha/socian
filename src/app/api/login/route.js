import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const teacherFilePath = path.join(
      process.cwd(),
      
      "db",
      "teachers.json"
    );
    const teachers = JSON.parse(fs.readFileSync(teacherFilePath, "utf-8"));

    const studentFilePath = path.join(
      process.cwd(),
      
      "db",
      "students.json"
    );
    const students = JSON.parse(fs.readFileSync(studentFilePath, "utf-8"));

    // Check if user is a teacher
    const teacher = teachers.find(
      (t) => t.email === email && t.password === password
    );
    if (teacher) {
      const token = jwt.sign({ type: "teacher", user: teacher }, secretKey);
      return new Response(JSON.stringify({ token }), { status: 200 });
    }

    // Check if user is a student
    const student = students.find(
      (s) => s.email === email && s.password === password
    );
    if (student) {
      const token = jwt.sign({ type: "student", user: student }, secretKey);
      return new Response(JSON.stringify({ token }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 400,
    });
  } catch (error) {
    return new Response(JSON.stringify({message: "Server error", error: error.message }), {
      status: 500,
    });
  }
}
