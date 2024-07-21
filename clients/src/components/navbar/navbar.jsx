import React, { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contex/Authcontext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-6 md:mr-12">Logo</h1>
          <nav className="hidden md:flex space-x-6">
            <Link to={"/"}>
              <p className="hover:text-gray-300">Home</p>
            </Link>
            <Link to={"/about"}>
              <p className="hover:text-gray-300">About Us</p>
            </Link>
            <Link to={"/dashboard"}>
              <p className="hover:text-gray-300">Dashboard</p>
            </Link>
            <Link to={"/contact"}>
              <p className="hover:text-gray-300">Contact</p>
            </Link>
          </nav>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <FaBars size={24} />
          </button>
        </div>
        <div className="flex items-center">
          <Link to={"/carts"}>
            <button className="px-4 py-2 bg-white hover:bg-gray-200 rounded-full text-black md:px-5 md:py-5">
              <AiOutlineShoppingCart size={16} className="md:hidden" />
              <AiOutlineShoppingCart size={20} className="hidden md:block" />
            </button>
          </Link>
          {isAuthenticated ? (
            <Link to={"/account"}>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white ml-6 md:ml-6">
                My Account
              </button>
            </Link>
          ) : (
            <Link to={"/auth"}>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white ml-6 md:ml-6">
                LOGIN
              </button>
            </Link>
          )}
        </div>
        {isOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col p-4 bg-gray-700">
              <Link to={"/"} onClick={toggleMenu}>
                <p className="hover:text-gray-300 py-2">Home</p>
              </Link>
              <Link to={"/about"} onClick={toggleMenu}>
                <p className="hover:text-gray-300 py-2">About Us</p>
              </Link>
              <Link to={"/dashboard"} onClick={toggleMenu}>
                <p className="hover:text-gray-300 py-2">Dashboard</p>
              </Link>
              <Link to={"/contact"} onClick={toggleMenu}>
                <p className="hover:text-gray-300 py-2">Contact</p>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
