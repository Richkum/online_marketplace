import React from "react";
import Navbar from "../navbar/navbar";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div
        className="relative h-screen overflow-hidden bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/images/blog-header.jpg')" }}
      >
        <Navbar />
        <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50 text-center px-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6 animate-fade-in">
            Welcome to ATUMM & DAVY STORE
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 animate-slide-in">
            Discover amazing products and deals just for you!
          </p>
          <Link to={"/auth"}>
            <button className="px-6 py-3 bg-blue-500 text-white font-medium text-lg rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out animate-bounce">
              LOGIN
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
