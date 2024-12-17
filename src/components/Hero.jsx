import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <header className="relative h-screen flex items-center">
      {/* Left Section: Image */}
      <div className=" h-full">
        <img
          src="/culturalClub.jpg" // Replace with your image path
          alt="Club activities"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Section: Text with Gradient Overlay */}
      <div className="h-full bg-gradient-to-r from-yellow-500/70 via-orange-500/70 to-red-600/90 text-white flex flex-col justify-center items-start p-12">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Join Your Favorite Club in Seconds
        </h1>
        <p className="text-lg mb-6">
          Easily sign up for clubs and connect with like-minded students—everything you need is just a click away.
        </p>
        <Link
          href="/register"
          className="bg-red-600/90 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Register Now
        </Link>
      </div>
    </header>
  );
};

export default Hero;
