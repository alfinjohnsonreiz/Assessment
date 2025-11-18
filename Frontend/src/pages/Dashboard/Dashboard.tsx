import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/context/ProductProvider";
import { useEffect, useMemo, useState } from "react";
import type { SaleData } from "../bill/Bill";
import { displaySalesApi } from "@/api/modules/sale.api";
import RecentSale from "./RecentSale";
import RecentPurchase from "./RecentPurchase";

const Dashboard = () => {
  const { products, stockProducts } = useProducts();
  const [sales, setSales] = useState<SaleData[]>([]);
  const lowStocks = useMemo(() => {
    return stockProducts.filter((stck) => stck.stockValue < 10).length;
  }, [stockProducts]);

  const revenue = useMemo(() => {
    return sales.reduce((acc, curr) => {
      return (acc += Number(curr.paidAmount));
    }, 0);
  }, [sales]);

  const fetching = async () => {
    try {
      const response = await displaySalesApi();
      setSales(response.data);
      console.log("Sales response dashboard", response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetching();
  }, []);
  const cards = [
    { cardTitle: "Today's Sales", content: sales.length },
    { cardTitle: "Revenue", content: revenue.toFixed(2) },
    { cardTitle: "AvailableProducts", content: products?.length },
    { cardTitle: "Current Stocks Items", content: stockProducts?.length },
    { cardTitle: "Low Stock", content: lowStocks },
  ];
  return (
    <div>
      <h2 className="text-2xl mb-2">Dashboard</h2>
      <div className="grid gap-4.5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
        {cards.map((card) => (
          <Card>
            <CardHeader>
              <CardTitle>{card.cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{card.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex justify-evenly">
        <div>
          <h2 className="text-center text-xl mb-2">Recent Sales</h2>
          <RecentSale sales={sales} />
        </div>
        <div>
          <h2 className="text-center text-xl mb-2">Recent Purchase</h2>
          <RecentPurchase />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
