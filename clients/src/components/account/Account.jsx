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

      <div className="container mx-auto p-8 flex">
        <div className="w-64">
          <div className="mt-4">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-xl font-bold mb-1 border-b border-gray-300 last:border-none"
            >
              Dashboard
            </Link>
            <Link to={"/"}>
              {" "}
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md mt-4"
              >
                <svg
                  className="w-6 h-6 mr-2"
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
        </div>

        <div className="flex-1 ml-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to My Account</h1>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Account;
