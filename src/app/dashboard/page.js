"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx"; // For Excel export

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deletingEmails, setDeletingEmails] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    // Redirect to login if no token exists
    if (!adminToken) {
      router.push("/login");
      return;
    }

    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/admin/students", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch student data");
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
        clubs: student.clubs?.join(", ") || "N/A",
      }));

    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  const handleDeleteStudents = async () => {
    if (selectedStudents.length === 0) {
      alert("No students selected for deletion.");
      return;
    }

    setDeletingEmails(selectedStudents);
    setOpenModal(true);
  };

  const confirmDelete = async () => {
    const adminToken = localStorage.getItem("adminToken");

    try {
      const res = await fetch("/api/admin/students", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ emails: deletingEmails }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete students");
      }

      const result = await res.json();
      alert(result.message);

      // Remove deleted students from the state
      setStudents((prevStudents) =>
        prevStudents.filter(
          (student) => !deletingEmails.includes(student.email)
        )
      );
      setSelectedStudents([]);
      setSelectAll(false);
      setOpenModal(false);
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error deleting students: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-6 items-center">
          <h1 className="text-3xl font-semibold">Students</h1>

          <div className="flex space-x-4">
            <button
              onClick={exportToExcel}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
              disabled={selectedStudents.length === 0}
            >
              Export to Excel
            </button>
            <button
              onClick={handleDeleteStudents}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:bg-red-300"
              disabled={selectedStudents.length === 0}
            >
              Delete Selected
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Reg No</th>
                <th className="p-4">Program</th>
                <th className="p-4">School</th>
                <th className="p-4">Center</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Date</th>
                <th className="p-4">Clubs</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.email}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.email)}
                      onChange={() => handleCheckboxChange(student.email)}
                    />
                  </td>
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.email}</td>
                  <td className="p-4">{student.regNo}</td>
                  <td className="p-4">{student.progOfStudy}</td>
                  <td className="p-4">{student.school}</td>
                  <td className="p-4">{student.center}</td>
                  <td className="p-4">{student.mobNo}</td>
                  <td className="p-4">{student.date}</td>
                  <td className="p-4">{student.clubs?.join(", ") || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p>
              Are you sure you want to delete {deletingEmails.length}{" "}
              student(s)?
            </p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setOpenModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
