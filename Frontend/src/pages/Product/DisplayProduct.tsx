import React, { useState } from "react";
import { useProducts } from "@/context/ProductProvider";
import { UpdateModal } from "./UpdateModal";

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
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const[open,setOpen]=useState(false);

  if (!products) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;


  
   const handleUpdateClick = (product: ProductType) => {
    setSelectedProduct(product);
    setOpen(true);
  };

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
            <th className="border px-4 py-2 text-left">Action</th>
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
              <button onClick={()=>handleUpdateClick(product)}>
                update
              </button>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateModal open={open} setOpen={setOpen} selectedProduct={selectedProduct}/>
    </div>
  );
};

export default DisplayProduct;
