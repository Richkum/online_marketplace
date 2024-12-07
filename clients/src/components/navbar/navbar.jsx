import React, { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contex/Authcontext";
import Modal from "react-modal";
import Auth from "../authentication/Auth";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const renderLink = (text, to) => {
    return (
      <Link to={to}>
        <span className="navbar-link">{text}</span>
      </Link>
    );
  };

  return (
    <div className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <img
            src="/images/ATUM & DAVY (1).png"
            alt="Team Member"
            className="w-16 h-16 rounded-full mx-auto mr-6 md:mr-12"
          />
          <nav className="hidden md:flex space-x-6">
            {renderLink("Home", "/")}
            {renderLink("About Us", "/about")}
            {renderLink("Contact", "/contact")}
          </nav>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
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
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white ml-6 md:ml-6"
              onClick={openAuthModal}
            >
              LOGIN
            </button>
          )}
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col p-4 bg-gray-700">
              {renderLink("Home", "/")}
              {renderLink("About Us", "/about")}
              {renderLink("Contact", "/contact")}
            </nav>
          </div>
        )}
        {isAuthModalOpen && (
          <Modal
            isOpen={isAuthModalOpen}
            onRequestClose={closeAuthModal}
            contentLabel="Authentication Modal"
            className="min-h-screen flex items-center justify-center bg-transparent"
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
          >
            <Auth setIsOpen={closeAuthModal} />
          </Modal>
        )}
        {showAlert && (
          <div className="fixed top-4 right-4 bg-red-600 text-white p-2 rounded-md shadow-md">
            <p>Please sign up</p>
          </div>
        )}
      </div>
      <style jsx>{`
        .navbar-link {
          display: inline-block;
          transition: transform 0.3s;
        }

        .navbar-link:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
}

export default Navbar;