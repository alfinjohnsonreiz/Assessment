import { useProducts } from "@/context/ProductProvider";
import React, { useState } from "react";
import type { ProductType } from "../Product/DisplayProduct";

type SelectedProduct = {
  product_id: string;
  quantity: number;
  price:number;
};

const Purchase = () => {
  const { products } = useProducts();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const[price,sePrice]=useState(0);

  if (!products) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  // const handleChange = (price:number,product_id: string, quantity: number) => {
  //   // if (quantity <= 0) {
  //   //   setSelectedProducts(prev => prev.filter(p => p.product_id !== product_id));
  //   //   return;
  //   // }

  //   const exists = selectedProducts.find(p => p.product_id === product_id);
  //   if (exists) {
  //     setSelectedProducts(prev =>
  //       prev.map(p =>
  //         p.product_id === product_id ? { ...p, quantity } : p
  //       )
  //     );
  //   } else {
  //   //   setSelectedProducts(prev => [...prev, { product_id, quantity }]);
  //   }
  // };

  const handleSubmit = () => {
    let sum=0;
    const totalAmount =selectedProducts.map((prod)=>sum=prod.price+sum)

    const reqBody = {
      items: selectedProducts,
      totalAmount,
    };
try {
    // const respoonse= await 
} catch (error) {
    console.log("Error in creating products")
}
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Purchase</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Price</th>
            <th className="border px-4 py-2 text-left">Tax %</th>
            <th className="border px-4 py-2 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            const selected = selectedProducts.find(p => p.product_id === product.product_id);
            return (
              <tr key={product.product_id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">{product.taxPercentage}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min={0}
                    value={selected?.quantity || ""}
                    onChange={e => handleChange(Number(product.price),product.product_id, Number(e.target.value))}
                    className="px-3 py-1 border w-20"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        className="px-3 py-1 border bg-red-500 text-white rounded-2xl mt-4"
        onClick={handleSubmit}
      >
        Purchase
      </button>
    </div>
  );
};

export default Purchase;
