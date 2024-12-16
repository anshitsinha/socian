'use client';

import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'; // For Excel export

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/admin/students');
        if (!res.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedStudents(students.map((student) => student.email));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleCheckboxChange = (email) => {
    if (selectedStudents.includes(email)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== email));
    } else {
      setSelectedStudents([...selectedStudents, email]);
    }
  };

  const exportToExcel = () => {
    const selectedData = students
      .filter((student) => selectedStudents.includes(student.email))
      .map((student) => ({
        ...student,
        clubs: student.clubs?.join(', ') || 'N/A', // Join the clubs array into a string
      }));
  
    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, 'students.xlsx');
  };
  

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={exportToExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          disabled={selectedStudents.length === 0}
        >
          Export Selected to Excel
        </button>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <span>Select All</span>
        </label>
      </div>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4 border-b">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Email</th>
            <th className="p-4 border-b">Registration Number</th>
            <th className="p-4 border-b">Program of Study</th>
            <th className="p-4 border-b">School</th>
            <th className="p-4 border-b">Center</th>
            <th className="p-4 border-b">Mobile Number</th>
            <th className="p-4 border-b">Date</th>
            <th className="p-4 border-b">Clubs</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.email} className="hover:bg-gray-100">
              <td className="p-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.email)}
                  onChange={() => handleCheckboxChange(student.email)}
                />
              </td>
              <td className="p-4 border-b">{student.name}</td>
              <td className="p-4 border-b">{student.email}</td>
              <td className="p-4 border-b">{student.regNo}</td>
              <td className="p-4 border-b">{student.progOfStudy}</td>
              <td className="p-4 border-b">{student.school}</td>
              <td className="p-4 border-b">{student.center}</td>
              <td className="p-4 border-b">{student.mobNo}</td>
              <td className="p-4 border-b">{student.date}</td>
              <td className="p-4 border-b">{student.clubs?.join(', ') || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
