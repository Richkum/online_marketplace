import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center min-h-screen md:min-h-[55vh]">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex-1 md:flex md:items-center">
          <span className="text-xl font-semibold">ATUM & DAVY STORE</span>
          <p className="mt-2 md:mt-0 md:ml-4">
            Bringing you the best online business experience
          </p>
        </div>
        <div className="flex-1 md:flex md:items-center">
          <span className="text-xl font-semibold">Navigation</span>
          <div className="mt-2 md:mt-0 md:ml-4">
            <a /*href="#"**/ className="mr-4 hover:underline">Home</a>
            <a /*href="#"**/ className="mr-4 hover:underline">About</a>
            <a /*href="#"**/ className="mr-4 hover:underline">Services</a>
            <a /*href="#"**/ className="hover:underline">Contact</a>
          </div>
        </div>
        <div className="flex-1 md:flex md:items-center">
          <span className="text-xl font-semibold">Contact Info</span>
          <div className="mt-2 md:mt-0 md:ml-4">
            <p>Address Line 1</p>
            <p>Address Line 2</p>
            <p>Yaounde, Cameroon</p>
            <p>Phone: +237 6 12 34 56 78</p>
            <p>Email: contactUs@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm">
          &copy; 2024 ATUM & DAVY STORE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;