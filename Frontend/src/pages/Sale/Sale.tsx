import { Button } from "../../components/ui/button";
import { ImCross } from "react-icons/im";
import { FaCheck, FaMinus } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useProducts, type StockProductType } from "@/context/ProductProvider";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { addSaleApi } from "@/api/modules/sale.api";
import { Link } from "react-router-dom";
import { ConfirmSale } from "./ConfirmSale";

interface SelectedStockType {
  stock_id: string;
  quantity: number;
  price: number;
}

const Sale = () => {
  const[open,setOpen]=useState(false);
  const { stockProducts,fetchingStocks } = useProducts();
  const[bill,setBill]=useState(false)
  const [selectedStock, setSelectedStock] = useState<SelectedStockType[]>([]);

  const handleSelect = (stock_id: string, price: number) => {
    setSelectedStock((prev) => [...prev, { stock_id, quantity: 1, price }]);
  };
  const handleUnSelect = (stock_id: string) => {
    setSelectedStock((prev) =>
      prev.filter((stck) => stck.stock_id !== stock_id)
    );
  };

  const handleAdd = (stock_id: string) => {
    setSelectedStock((prev) =>
      prev.map((stck) =>
        stck.stock_id == stock_id
          ? { stock_id, quantity: stck.quantity + 1, price: stck.price }
          : stck
      )
    );
  };

  const handleMinus = (stock_id: string) => {
    setSelectedStock((prev) =>
      prev.map((stck) =>
        stck.stock_id == stock_id && stck.quantity > 1
          ? { stock_id, price: stck.price, quantity: stck.quantity - 1 }
          : stck
      )
    );
  };

  const totalAmount = useMemo(() => {
    let total = selectedStock.reduce((acc, curr) => {
      return (acc += curr.quantity * curr.price);
    }, 0);
    return total;
  }, [selectedStock]);

  const discount = useMemo(() => {
    let perc = 0;
    if (totalAmount >= 1000 && totalAmount < 2000) {
      perc = 1;
    } else if (totalAmount > 2000) {
      perc = 2;
    }
    return perc;
  }, [totalAmount]);
  const discountAmount = totalAmount * ((discount ?? 0) / 100);
  const discountedTotal = totalAmount - discountAmount;

  const handleSale = async () => {
    if(selectedStock.length===0){
      toast("Item not selected")
      return
    }
    try {
      const reqbody = {
        totalAmount,
        discount,
        items: selectedStock,
      };
      const response= await addSaleApi(reqbody)
      // console.log(response)
      if(response.success){
        toast.success("Sale created")
        setBill(true)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something happened");
    } finally {
      setSelectedStock([]);
      fetchingStocks()
    }
  };

  return (
    <div>
      <h2 className="text-center">Sale</h2>
      <div className="flex flex-col items-center justify-center gap-4">
        <table border={1}>
          <thead className="border-2">
            <tr>
              <th className="border-2 px-4 py-2 text-left">Name</th>
              <th className="border-2 px-4 py-2 text-left">Price</th>
              <th className="border-2 px-4 py-2 text-left">Tax</th>
              <th className="border-2 px-4 py-2 text-left">In Stock</th>
              <th className="border-2 px-4 py-2 text-left">Select</th>
              <th className="border-2 px-4 py-2 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {stockProducts.length == 0 && (
              <tr className="w-full text-center border">
                <td className="text-center px-4 py-4 w-full">
                  No Products Available
                </td>
              </tr>
            )}
            {stockProducts.map((prod: StockProductType) => {
              const select = selectedStock.find(
                (stck) => stck.stock_id === prod.stock_id
              );
              return (
                <tr key={prod.stock_id}>
                  <td className="border-2 px-4 py-2 text-left">{prod.name}</td>
                  <td className="border-2 px-4 py-2 text-left">{prod.price}</td>
                  <td className="border-2 px-4 py-2 text-left">
                    {prod.product?.taxPercentage}
                  </td>
                  <td className="border-2 px-4 py-2 text-left">
                    {prod.stockValue}
                  </td>
                  <td className="border-2 px-4 py-2 text-left">
                    <div className=" flex gap-2">
                      <Button
                        disabled={select ? true : false}
                        onClick={() => handleSelect(prod.stock_id, prod.price)}
                      >
                        <FaCheck />
                      </Button>
                      <Button
                        disabled={select ? false : true}
                        onClick={() => handleUnSelect(prod.stock_id)}
                      >
                        <ImCross />
                      </Button>
                    </div>
                  </td>
                  <td className="border-2 px-4 py-2 text-left">
                    <div className=" flex gap-2">
                      <Button
                        disabled={select ? false : true}
                        onClick={() => handleAdd(prod.stock_id)}
                        size={"sm"}
                        className="bg-gray-300 hover:bg-gray-400"
                      >
                        <MdAdd className="text-black" />
                      </Button>
                      <span className="text-md">
                        {select?.quantity ? select.quantity : 0}
                      </span>
                      <Button
                        disabled={select ? false : true}
                        onClick={() => handleMinus(prod.stock_id)}
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
        <div>
          <Button onClick={()=>setOpen(true)}>Sale</Button>
        </div>
        <div className="mt-4 p-4 border rounded w-full max-w-md">
          <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
          <p>
            Discount ({discount}%): ₹
            {((totalAmount * discount) / 100).toFixed(2)}
          </p>
          <p><strong>Net Payable:</strong> ₹{(discountedTotal).toFixed(2)}</p>
        </div>
        {bill&&(
          <div>
            <h2>Bill Generated</h2>
            <Link to='/bill'>View Bill</Link>
          </div>
        )}
      </div>
      <ConfirmSale open={open} setOpen={setOpen} handleSale={handleSale}/>
    </div>
  );
};

export default Sale;
