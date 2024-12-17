"use client";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
    

    
  <Hero/>

      {/* Features Section */}
      {/* <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-8">Why Choose MyApp?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-4">Manage Students</h3>
            <p className="text-gray-600">Easily register, track, and view all student data in one place.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-4">Clubs & Activities</h3>
            <p className="text-gray-600">Organize and manage student clubs and activities effectively.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-4">Reports & Analytics</h3>
            <p className="text-gray-600">Generate comprehensive reports and insights for better decision-making.</p>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-4">Made by SOE.</p>
          <div className="flex justify-center space-x-6">
            {/* <Link href="/terms" className="hover:text-indigo-400">Terms & Conditions</Link> */}
            <Link href="/privacy" className="hover:text-indigo-400">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-indigo-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
