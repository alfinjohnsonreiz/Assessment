import { addProductApi } from "@/api/modules/product.api";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/context/ProductProvider";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const AddProduct = (props: Props) => {
  const { fetchingProducts } = useProducts();
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
      toast.success("Product Added Success");
    } catch (error: any) {
      setError(error.message);
      toast.error("Error creating product");
    } finally {
      setFormData({
        name: "",
        description: "",
        price: "",
        taxPercentage: "",
      });
      fetchingProducts();
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <div className="w-[70%] h-100  border-2 ">
        <form onSubmit={handleSubmit} className="flex-col gap-x-2 h-100 ">
          <div className="flex bg-white items-center justify-center gap-4 ">
            <div className="p-4">
              <label className="block text-sm font-medium mt-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="p-4">
              <label className="block text-sm font-medium mt-2">
                Description
              </label>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Enter product description"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="p-4">
              <label className="block text-sm mt-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Enter price"
                required
              />
            </div>

            <div className="p-4">
              <label className="block text-sm mt-2">Tax Percentage</label>
              <input
                type="number"
                name="taxPercentage"
                value={formData.taxPercentage}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
                placeholder="Enter tax percentage"
                required
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Button type="submit">
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
