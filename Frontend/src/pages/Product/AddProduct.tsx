import { addProductApi } from "@/api/modules/product.api";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const AddProduct = (props: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    taxPercentage: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const data = await addProductApi(formData);
      console.log(data);
      setSuccess("Product Added Succefully");
      toast.success("Product Added Success")
    } catch (error: any) {
      setError(error.message);
      toast.error("Error creating product")
    } finally {
      setFormData({
        name: "",
        description: "",
        price: "",
        taxPercentage: "",
      });
    }
  };
  return (
    <div className="w-full">
      <h1 className="text-center">Add Product</h1>
      <div className="w-[50%] mx-auto">
        <form onSubmit={handleSubmit} className="flex-col gap-x-2 ">
          <div>
            <label className="block text-sm font-medium mt-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mt-2">Description</label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label className="block text-sm mt-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block text-sm mt-2">Tax Percentage</label>
            <input
              type="number"
              name="taxPercentage"
              value={formData.taxPercentage}
              onChange={handleChange}
              className="w-full "
              placeholder="Enter tax percentage"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 p-2 "
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
