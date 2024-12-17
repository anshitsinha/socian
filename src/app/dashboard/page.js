'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx'; // For Excel export

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if the adminToken exists in localStorage
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      // Redirect to login if no token exists
      router.push('/login');
      return;
    }

    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/admin/students', {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
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
  }, [router]);

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

  const handleDeleteStudents = async () => {
    if (selectedStudents.length === 0) {
      alert('No students selected for deletion.');
      return;
    }

    const confirmDeletion = window.confirm(
      `Are you sure you want to delete ${selectedStudents.length} student(s)?`
    );
    if (!confirmDeletion) return;

    const adminToken = localStorage.getItem('adminToken');

    try {
      const res = await fetch('/api/admin/students', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ emails: selectedStudents }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete students');
      }

      const result = await res.json();
      alert(result.message);

      // Remove deleted students from the state
      setStudents((prevStudents) =>
        prevStudents.filter(
          (student) => !selectedStudents.includes(student.email)
        )
      );
      setSelectedStudents([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error:', error.message);
      alert(`Error deleting students: ${error.message}`);
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/login');
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

      {/* Logout Button */}
      <div className="text-right mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={exportToExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          disabled={selectedStudents.length === 0}
        >
          Export Selected to Excel
        </button>
        <button
          onClick={handleDeleteStudents}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
          disabled={selectedStudents.length === 0}
        >
          Delete Selected
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
