import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center min-h-screen md:min-h-[55vh]">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex-1 md:flex md:items-center">
          <span className="text-xl font-semibold">Company Name</span>
          <p className="mt-2 md:mt-0 md:ml-4">
            Your company slogan or description
          </p>
        </div>
        <div className="flex-1 md:flex md:items-center">
          <span className="text-xl font-semibold">Navigation</span>
          <div className="mt-2 md:mt-0 md:ml-4">
            <a href="#" className="mr-4 hover:underline">
              Home
            </a>
            <a href="#" className="mr-4 hover:underline">
              About
            </a>
            <a href="#" className="mr-4 hover:underline">
              Services
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
        <div className="flex-1 md:flex md:items-center">
          <span className="text-xl font-semibold">Contact Info</span>
          <div className="mt-2 md:mt-0 md:ml-4">
            <p>Address Line 1</p>
            <p>Address Line 2</p>
            <p>City, State, Zip</p>
            <p>Phone: 123-456-7890</p>
            <p>Email: contact@example.com</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm">
          &copy; 2023 Your Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
