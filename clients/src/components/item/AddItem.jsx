import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchCategories } from "../../apiCalls/fetchData";

function AddItemModal({ isOpen, onClose }) {
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
    const data = new FormData();
    formData.images.forEach((image) => data.append("images", image));
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("name", formData.name);
    data.append("category", formData.category);

    console.log("Submitting form data:", {
      price: formData.price,
      description: formData.description,
      name: formData.name,
      category: formData.category,
      images: formData.images,
    });

    try {
      const response = await axios.post("/api/product/add-product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
      });
      console.log("Product added successfully:", response.data);
      onClose();
    } catch (err) {
      if (err.response) {
        console.error("Error adding product:", err.response.data.message);
      } else if (err.request) {
        console.error(
          "Error adding product: No response received",
          err.request
        );
      } else {
        console.error("Error adding product:", err.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <button onClick={onClose} className="float-right text-gray-500">
          Close
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
              className="border border-gray-400 p-2"
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
              Price
            </label>
            <input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
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
              className="border border-gray-400 p-2 w-full"
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
              className="border border-gray-400 p-2 w-full"
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
              className="border border-gray-400 p-2 w-full"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
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
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
