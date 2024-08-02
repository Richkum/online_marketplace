import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { AuthContext } from "../../contex/Authcontext";
import Footer from "../footer/Footer";

function Account() {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-8 flex flex-col md:flex-row">
        <div className="w-full md:w-64 mb-8 md:mb-0">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Menu</h2>
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-gray-700 hover:text-blue-500 transition duration-300"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-700 hover:text-blue-500 transition duration-300"
            >
              Profile
            </Link>
          </div>
        </div>

        <div className="flex-1 ml-0 md:ml-8">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome to My Account
            </h1>
            <p className="text-gray-600 mb-4">
              Manage your account, view your orders, and update your profile.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Recent Orders
                </h3>
                <p className="text-gray-600">You have no recent orders.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Account Settings
                </h3>
                <p className="text-gray-600">
                  Update your personal information and change your password.
                </p>
                <Link
                  to="/account-settings"
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  Go to Settings
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Wishlist
                </h3>
                <p className="text-gray-600">
                  View products you've added to your wishlist.
                </p>
              </div> */}
              <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Support
                </h3>
                <p className="text-gray-600">
                  Need help? Contact our support team.
                </p>
                <Link
                  to="/support"
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 flex justify-center">
        <Link to={"/"}>
          <button
            onClick={logout}
            className="w-full max-w-sm bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            <svg
              className="w-6 h-6 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Logout
          </button>
        </Link>
      </div>

      <Footer />
    </>
  );
}

export default Account;
