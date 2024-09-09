import React from "react";

function PopUp({ message, closePopUp }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Payment Status</h2>
        <p>{message}</p>
        <button
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          onClick={closePopUp}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PopUp;
