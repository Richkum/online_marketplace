import React from "react";
import Navbar from "../navbar/navbar";

function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
            About Us
          </h1>
          <p className="mt-4 text-gray-600 sm:text-xl">
            We are a team of passionate individuals dedicated to bringing you
            the best online business experience.
          </p>
          <div className="mt-8 flex justify-center">
            <button className="px-6 py-3 bg-blue-500 text-white font-medium text-lg rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
