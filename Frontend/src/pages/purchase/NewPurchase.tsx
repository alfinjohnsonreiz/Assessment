import { useProducts } from "@/context/ProductProvider";
import { useMemo, useState } from "react";
// import type { ProductType } from "../Product/DisplayProduct";
import { Button } from "@/components/ui/button";
import { createPurchaseApi } from "@/api/modules/purchase.api";
import { ImCross } from "react-icons/im";
import { FaCheck, FaMinus } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";
import { ConfirmPurchase } from "./ConfirmPurchase";

type SelectedProduct = {
  product_id: string;
  quantity: number;
  price: number;
};

const NewPurchase = () => {
  const[open,setOpen]=useState(false);

  const { products,fetchingStocks } = useProducts();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );

  const handleSelect = (
    product_id: string,
    quantity: number,
    price: number
  ) => {
    setSelectedProducts((prev) => [...prev, { product_id, quantity, price }]);
  };

  const handleRemove = (product_id: string) => {
    const updatedProducts = selectedProducts.filter(
      (product: SelectedProduct) => {
        return product.product_id !== product_id;
      }
    );
    setSelectedProducts(updatedProducts);
  };

  const handleAdd = (product_id: string) => {
    const product = selectedProducts.find(
      (prod) => prod.product_id === product_id
    );
    const newQuantity = product?.quantity! + 1;
    const updatedProducts = selectedProducts.map((prod) => {
      if (prod.product_id == product_id) {
        return { ...prod, quantity: newQuantity };
      }
      return prod;
    });
    setSelectedProducts(updatedProducts);
  };

  const handleMinus = (product_id: string) => {
    const updated = selectedProducts.map((prod) =>
      prod.product_id == product_id && prod.quantity > 1
        ? { ...prod, quantity: prod.quantity - 1 }
        : prod
    );
    setSelectedProducts(updated);
  };

  const totalAmount = useMemo(() => {
    if (!selectedProducts) return null;
    const total = selectedProducts?.reduce(
      (acc, curr) => (acc += curr.price * curr.quantity),
      0
    );
    return total;
  }, [selectedProducts]);
  const handleSubmit = async () => {
    if(selectedProducts.length==0){
      toast("select the products first")
      return
    }
    try {
      const reqbody = {
        items: selectedProducts,
        totalAmount: totalAmount,
      };
      const response = await createPurchaseApi(reqbody);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    finally{
      fetchingStocks();
      setSelectedProducts([])
    }
  };

  if (!products) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Purchase</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Price</th>
            <th className="border px-4 py-2 text-left">Tax %</th>
            <th className="border px-4 py-2 text-left">Action</th>
            <th className="border px-4 py-2 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const selected = selectedProducts.find(
              (p) => p.product_id === product.product_id
            );
            return (
              <tr key={product.product_id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">{product.taxPercentage}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <Button
                    className=""
                    disabled={selected ? true : false}
                    onClick={() =>
                      handleSelect(product.product_id, 1, Number(product.price))
                    }
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    disabled={selected ? false : true}
                    onClick={() => handleRemove(product.product_id)}
                  >
                    <ImCross />
                  </Button>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex gap-6">
                    <Button
                      disabled={selected ? false : true}
                      className="bg-gray-300 hover:bg-gray-400"
                      onClick={() => handleAdd(product.product_id)}
                    >
                      <MdAdd className="text-black" />
                    </Button>
                    <span className="text-md">
                      {selected?.quantity ? selected.quantity : 0}
                    </span>
                    <Button
                      disabled={selected ? false : true}
                      onClick={() => handleMinus(product.product_id)}
                      size={"sm"}
                      className="bg-gray-300 hover:bg-gray-400"
                    >
                      <FaMinus className="text-black" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        onClick={()=>setOpen(true)}
        className="bg-red-500 mt-3 hover:bg-red-600"
      >
        Purchase
      </Button>
      <ConfirmPurchase open={open} setOpen={setOpen} handlePurchase={handleSubmit}/>
    </div>
  );
};

export default NewPurchase;
