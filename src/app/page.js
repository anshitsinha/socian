'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <header className="bg-indigo-600 text-white h-screen flex flex-col justify-center items-center text-center">
  <h1 className="text-5xl font-bold mb-6">Join Your Favorite Club in Seconds</h1>
  <p className="text-lg mb-6">Easily sign up for clubs and connect with like-minded students—everything you need is just a click away.</p>
  <Link href="/register" className="bg-indigo-800 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300">
    Register Now
  </Link>
</header>


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
            <Link href="/privacy" className="hover:text-indigo-400">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-indigo-400">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
