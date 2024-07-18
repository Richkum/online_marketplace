import React from "react";

function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6"></h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-100 rounded mt-2 focus:border-gray-200 focus:outline-none focus:shadow-outline focus:rounded-mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-100 rounded mt-2 focus:border-gray-200 focus:outline-none focus:shadow-outline focus:rounded-mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-100 rounded mt-2 focus:border-gray-200 focus:outline-none focus:shadow-outline focus:rounded-mt-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          ></button>
        </form>
        <button className="mt-4 text-blue-500">
          {" "}
          Already have an account?
        </button>
      </div>
    </div>
  );
}

export default Auth;
