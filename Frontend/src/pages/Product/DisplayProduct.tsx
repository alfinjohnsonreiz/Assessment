import React from "react";
import { useProducts } from "@/context/ProductProvider";

export interface ProductType {
  product_id: string;
  name: string;
  description: string;
  price: string; 
  currentStock: boolean;
  taxPercentage: string; 
  createdAt: string;
}

const DisplayProduct: React.FC = () => {
  const { products } = useProducts();

  if (!products) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="">
      <table className="w-full  border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-left">Price</th>
            <th className="border px-4 py-2 text-left">Stock</th>
            <th className="border px-4 py-2 text-left">Tax %</th>
            <th className="border px-4 py-2 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: ProductType) => (
            <tr key={product.product_id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">
                {product.currentStock ? "Available" : "Out of Stock"}
              </td>
              <td className="border px-4 py-2">{product.taxPercentage}</td>
              <td className="border px-4 py-2">
                {new Date(product.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayProduct;
