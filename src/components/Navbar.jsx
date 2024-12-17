'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import the router

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Check if the token exists in localStorage when the component mounts
    const token = localStorage.getItem("adminToken");
    setIsLoggedIn(!!token); // Set logged in state based on token presence
  }, []); // Run only once on mount

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear the JWT token from localStorage
    localStorage.removeItem("adminToken");

    // Redirect to the login page
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <nav className=" bg-gray-900 sticky p-4 shadow-lg  w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Socian
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-white">
          <Link href="/" className="hover:text-indigo-400">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-indigo-400">
            Dashboard
          </Link>
          <Link href="/register" className="hover:text-indigo-400">
            Register
          </Link>
          <Link href="/clubs" className="hover:text-indigo-400">
            Clubs
          </Link>
          <Link href="/about" className="hover:text-indigo-400">
            About
          </Link>

          {/* Conditionally render Logout button */}
          {isLoggedIn && (
            <button onClick={handleLogout} className="hover:text-red-500">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-900 text-white`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          <Link href="/" className="hover:text-indigo-400">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-indigo-400">
            Dashboard
          </Link>
          <Link href="/register" className="hover:text-indigo-400">
            Register
          </Link>
          <Link href="/clubs" className="hover:text-indigo-400">
            Clubs
          </Link>
          <Link href="/about" className="hover:text-indigo-400">
            About
          </Link>

          {/* Conditionally render Mobile Logout button */}
          {isLoggedIn && (
            <button onClick={handleLogout} className="hover:text-red-500">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
