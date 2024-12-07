import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { fetchCategories } from "../../apiCalls/fetchData";
import { AuthContext } from "../../contex/Authcontext";
import { useNavigate } from "react-router-dom";

function AddItemModal({ isOpen, onClose }) {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log(user.id);
    }
  }, [user]);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    images: [],
    price: "",
    description: "",
    name: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };

    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = [...formData.images, ...Array.from(files)];
      setFormData({ ...formData, images: newImages.slice(0, 8) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    const data = new FormData();
    formData.images.forEach((image) => data.append("images", image));
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("name", formData.name);
    data.append("category", formData.category);

    try {
      await new Promise((resolve) => setTimeout(resolve, 60000));

      const response = await axios.post(
        `${API_URL}/product/add-product`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 60000,
        }
      );
      console.log("Product added successfully:", response.data);
      setMessage({ type: "success", message: response.data.message });
      navigate("/listings");
      onClose();
    } catch (err) {
      if (err.response) {
        console.error("Error adding product:", err.response.data.message);
        setMessage({ type: "error", message: err.response.data.message });
      } else if (err.request) {
        console.error(
          "Error adding product: No response received",
          err.request
        );
        setMessage({ type: "error", message: "No response received" });
      } else {
        console.error("Error adding product:", err);
        setMessage({ type: "error", message: "An error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center px-4 py-8">
      {message && (
        <div
          className={`fixed left-0 top-1/4 p-4 rounded-md transition-all duration-1000 ${
            message.type === "success" ? "bg-green-100" : "bg-red-100"
          }`}
          style={{ zIndex: 1000, animation: "slideInOut 3s forwards" }}
        >
          <h3 className="font-bold">
            {message.type === "success" ? "Success!" : "Error:"}
          </h3>
          <p>{message.message}</p>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-lg p-8 overflow-auto max-h-full">
        <button
          onClick={onClose}
          className="float-right text-white bg-red-500 hover:bg-red-700 px-2 py-1 rounded-lg"
          style={{ maxHeight: "80vh" }}
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Add Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="images"
            >
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
              className="border border-gray-200 p-2"
            />
            {formData.images.length > 0 && (
              <div className="mt-2">
                <p className="font-bold">Uploaded Images:</p>
                <div className="flex flex-wrap">
                  {formData.images.map((image, index) => (
                    <div key={index} className="p-2">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        className="max-h-48"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = formData.images.filter(
                            (img, i) => i !== index
                          );
                          setFormData({ ...formData, images: newImages });
                          URL.revokeObjectURL(image);
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="price"
            >
              Price($)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-200 p-2 w-full outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-200 p-2 w-full outline-none"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-200 p-2 w-full outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className=" p-2 w-full bg-white outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="bg-white border p-2"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => console.log(formData)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Preview
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Adding item..." : "Add Item"}
            </button>
          </div>
          {isLoading && (
            <div className="text-center mt-4">
              <p className="text-gray-700">
                Adding item. This might take a while.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
