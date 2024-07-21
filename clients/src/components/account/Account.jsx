import React, { useContext } from "react";
import Navbar from "../navbar/navbar";
import { AuthContext } from "../../contex/Authcontext";
import { Link } from "react-router-dom";

function Account() {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to My Account</h1>
        <Link to={"/"}>
          {" "}
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
            onClick={logout}
          >
            Logout
          </button>
        </Link>
      </div>
    </>
  );
}

export default Account;
