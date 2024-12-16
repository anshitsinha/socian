import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg fixed w-full top-0 z-50">
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
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-gray-900 text-white`}>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
