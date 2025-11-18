import { fetchBillsApi } from "@/api/modules/bill.api";
import { useEffect, useState } from "react";


export interface SaleItemData {
  basePrice: string;
  productName: string;
  quantity: number;
  saleItem_id: string;
  salePrice: string;
  taxPercentage: string;
  taxPrice: string;
}

export interface SaleData {
  actualAmount: string;
  discount: string;
  paidAmount: string;
  taxPercentage: string;
  taxPrice: string;
  createdAt: string;
  saleItems: SaleItemData[];
}
export interface BillsData {
  bill_id: string;
  actualAmount: string;
  discount: string;
  paidAmount: string;
  sale: SaleData;
  tax: string;
}
const Bill = () => {
  const [bills, setBills] = useState<BillsData[]>([]);

  const fetching = async () => {
    try {
      const response = await fetchBillsApi();
      setBills(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetching();
  }, []);
  return (
    <div className="w-full">
      <h1 className="text-2xl">Sales & Bills</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-3">
        {bills.length == 0 ? (
          <div className="w-full border-2 bg-gray-100 border-dotted h-64 text-center flex items-center justify-center">
            <h2 className="text-xl">No Bills and Sales Available</h2>
          </div>
        ) : (
          bills.map((bill) => (
            <div key={bill.bill_id} className="border bg-gray-200 p-2 mb-2">
              <p className="font-medium text-[16px]">
                Bill ID:
                <span className="font-light ml-2 text-gray-700">
                  {bill.bill_id}
                </span>
              </p>

              <h4 className="text-xl">Items:</h4>
              <table className="w-full">
                <thead>
                  <tr className="text-center border">
                    <th className="text-left  px-2 py-2">Item Name</th>
                    <th className="text-left  px-2 py-2">Quantity</th>
                    <th className="text-left  px-2 py-2">Base Price</th>
                    <th className="text-cneter  px-2 py-2">Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {bill.sale.saleItems.map((item) => (
                    <tr key={item.saleItem_id} className="border">
                      <td className="text-left px-2 py-2">
                        {item.productName}
                      </td>
                      <td className="text-left px-2 py-2">{item.quantity}</td>
                      <td className="text-left px-2 py-2">{item.basePrice}</td>
                      <td className="text-center  px-2 py-2">
                        <div>
                          {item.taxPercentage}% {"->"} Rs.{item.taxPrice}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <p className="font-medium text-[16px]">
                  Actual Amount :
                  <span className="font-medium ml-2 text-gray-700">
                    {Number(bill.actualAmount).toFixed(2)}/-
                  </span>
                </p>
                <p className="font-medium text-[16px]">
                  Discount :
                  <span className="font-medium ml-2 text-gray-700">
                    {Number(bill.discount) == 0
                      ? "No discount available"
                      : `Rs${bill.discount}`}
                  </span>
                </p>
                <p className="font-medium text-[16px]">
                  tax :
                  <span className="font-medium ml-2 text-gray-700">
                    {Number(bill.tax).toFixed(2)}/-
                  </span>
                </p>
                <p className="font-medium text-[16px]">
                  Paid Amount :
                  <span className="font-medium ml-2 text-black">
                    {Number(bill.paidAmount).toFixed(2)} /-
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bill;
