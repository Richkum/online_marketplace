import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/Footer";
import AddItemModal from "../item/AddItem";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </div>
      <AddItemModal isOpen={isModalOpen} onClose={closeModal} />
      <Footer />
    </>
  );
}

export default Dashboard;
