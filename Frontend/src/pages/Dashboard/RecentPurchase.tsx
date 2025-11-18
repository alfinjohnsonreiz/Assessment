import { fetchAllPurchseApi } from "@/api/modules/purchase.api";
import { useEffect, useState } from "react";

interface PurchaseItem {
  purchaseItem_id: string;
  purchasePrice: string;
  quantity: number;
}
interface PurchaseType {
  createdAt: string;
  purchase_id: string;
  totalAmount: number;
  purchaseItems: PurchaseItem[];
}

const RecentPurchase = () => {
  const [purchase, setPurchase] = useState<PurchaseType[]>([]);

  const fetching = async () => {
    try {
      const response = await fetchAllPurchseApi();
      setPurchase(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetching();
  }, []);
  return (
    <table className="w-[50%">
      <thead>
        <tr className="text-center border">
          <th className="text-center  px-2 py-2">Purchase created</th>
          <th className="text-left  px-2 py-2">Purchase amount</th>
          <th className="text-left  px-2 py-2">No.of Purchase items</th>
        </tr>
      </thead>
      <tbody>
        {purchase.slice(0,10).map((purchase) => (
          <tr className="text-center border">
            <td className="text-left  px-2 py-2">{new Date(purchase.createdAt).toLocaleDateString()}</td>
            <td className="text-left  px-2 py-2">{purchase.totalAmount}</td>
            <td className="text-left  px-2 py-2">
                {purchase.purchaseItems.length}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentPurchase;
