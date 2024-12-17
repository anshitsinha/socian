"use client";

import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [progOfStudy, setProgOfStudy] = useState("");
  const [school, setSchool] = useState("");
  const [center, setCenter] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedClubs, setSelectedClubs] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button
  const [modalMessage, setModalMessage] = useState(""); // Modal message
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  const clubs = [
    {
      name: "Dance Club",
      coordinator: "Dr. Anupama Namburu, School of Engineering",
    },
    { name: "Debating Club", coordinator: "Dr. Umesh Kumar Khute, CHS/SSS" },
    { name: "Drama Club", coordinator: "Dr. Vijender Singh, SSIS" },
    { name: "Film Club", coordinator: "Dr. Vinay Kumar Gupta, CFFS/SLL&CS" },
    { name: "Fine Arts Club", coordinator: "Dr. Poonam Agarwal, SC&SS" },
    {
      name: "Literary Club",
      coordinator: "Dr. Garima Dalal, Linguistic Empowerment Cell",
    },
    { name: "Music Club", coordinator: "Dr. Archana Kumari, CMS/SSS" },
    {
      name: "Nature & Wildlife Club",
      coordinator:
        "Dr. Poonam Agarwal, SC&SS, Dr. Sachin Balkrushna Jadhav, SC&SS",
    },
    { name: "Photography Club", coordinator: "Dr. Suraj Mal, CSRD/SSS" },
    {
      name: "UNESCO Club",
      coordinator:
        "Dr. Sandeep Kumar Pandey, CRS/SLL&CS, Dr. Archana Kumari, CMS/SSS",
    },
    { name: "Wellness Club", coordinator: "Dr. Suman Beniwal, CRS/SLL&CS" },
    { name: "Environment Club", coordinator: "Dr. Ravi Kumar Umrao, SES" },
  ];

  const handleCheckboxChange = (club) => {
    setSelectedClubs((prevSelectedClubs) => {
      if (prevSelectedClubs.includes(club)) {
        return prevSelectedClubs.filter((c) => c !== club); // Uncheck
      }
      return [...prevSelectedClubs, club]; // Check
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading state

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        regNo,
        progOfStudy,
        school,
        center,
        mobNo,
        date,
        clubs: selectedClubs,
      }),
    });

    const data = await res.json();
    setIsLoading(false); // Stop loading state

    if (res.ok) {
      setSuccess(true);
      setModalMessage("Please contact deans office to make the payment.");
      setTimeout(() => {
        setIsModalOpen(true); // Open the modal
        clearForm();
      }, 500); // Delay to show modal after form clears
    } else {
      setError(true);
      setModalMessage(data.message || "Something went wrong.");
      setIsModalOpen(true); // Open modal on error
    }
  };

  const clearForm = () => {
    setName("");
    setRegNo("");
    setProgOfStudy("");
    setSchool("");
    setCenter("");
    setMobNo("");
    setEmail("");
    setDate(new Date().toISOString().split("T")[0]);
    setSelectedClubs([]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registration No.
          </label>
          <input
            type="text"
            placeholder="Enter your registration number"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Program of Study
          </label>
          <input
            type="text"
            placeholder="Enter your program of study"
            value={progOfStudy}
            onChange={(e) => setProgOfStudy(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            School
          </label>
          <input
            type="text"
            placeholder="Enter your school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Center
          </label>
          <input
            type="text"
            placeholder="Enter your center"
            value={center}
            onChange={(e) => setCenter(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="text"
            placeholder="Enter your mobile number"
            value={mobNo}
            onChange={(e) => setMobNo(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Select Clubs
          </h3>
          {clubs.map((club) => (
            <div key={club.name} className="mb-4">
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedClubs.includes(club.name)}
                  onChange={() => handleCheckboxChange(club.name)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{club.name}</span>
              </label>
              {club.coordinator && (
                <p className="text-xs text-gray-500 mt-1">
                  Coordinator: {club.coordinator}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className={`w-full py-2 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h2 className="text-2xl font-semibold text-center mb-4">
              {success ? "Successfully registered!" : "Error!"}
            </h2>
            <p className="text-center text-gray-700 mb-4">{modalMessage}</p>
            <div className="text-center">
              <button
                onClick={closeModal}
                className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <p className="mt-4 text-center text-red-600">{error}</p>}
    </div>
  );
};

export default Register;
