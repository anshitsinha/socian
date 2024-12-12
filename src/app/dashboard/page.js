"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import * as XLSX from "xlsx"; // Import the xlsx library

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwt.decode(token);
      if (decoded) {
        setUser(decoded);
        if (decoded.type === "teacher") {
          fetchStudents(decoded.user.club); // Use decoded.club for teacher's club
        }
      }
    } catch (err) {
      setError("Invalid token");
      router.push("/login");
    }
  }, [router]);

  const fetchStudents = async (club) => {
    try {
      const res = await fetch(`/api/students?club=${club}`);
      const data = await res.json();
      if (res.ok) {
        setStudents(data);
        console.log(data)
      } else {
        setError("Failed to fetch students");
      }
    } catch (err) {
      setError("Error fetching students");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const exportToExcel = () => {
    // Include the 'clubs' field, converting it to a comma-separated string
    const studentsWithFormattedClubs = students.map((student) => ({
      ...student,
      clubs: student.clubs ? student.clubs.join(", ") : "", // Convert array to comma-separated string
    }));
  
    const ws = XLSX.utils.json_to_sheet(studentsWithFormattedClubs); // Create worksheet
    const wb = XLSX.utils.book_new(); // Create new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Students"); // Append worksheet to workbook
  
    XLSX.writeFile(wb, "students_details.xlsx"); // Save file
  };
  

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

 
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-medium">Name:</p>
          <p>{user?.user?.name}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Email:</p>
          <p>{user?.user?.email}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Registration No:</p>
          <p>{user?.user?.regNo}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Program of Study:</p>
          <p>{user?.user?.progOfStudy}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">School:</p>
          <p>{user?.user?.school}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Center:</p>
          <p>{user?.user?.center}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Mobile No:</p>
          <p>{user?.user?.mobNo}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Date:</p>
          <p>{user?.user?.date}</p>
        </div>

        {user?.type === "teacher" ? (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Assigned Club: {user?.user?.club}
            </h2>
            <h3 className="text-lg font-medium">Students in your club:</h3>
            {students.length > 0 ? (
              <div className="space-y-2">
                <ul className="list-disc pl-5">
                  {students.map((student) => (
                    <li key={student.email} className="text-gray-700">
                      {student.name}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={exportToExcel}
                >
                  Export to Excel
                </button>
              </div>
            ) : (
              <p>No students in this club.</p>
            )}
          </div>
        ) : (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              Clubs: {user?.user?.clubs?.join(", ")}
            </h2>
          </div>
        )}
      </div>

      <button
        className="mt-6 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
