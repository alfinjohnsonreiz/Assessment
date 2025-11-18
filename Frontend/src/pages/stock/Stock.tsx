import { useProducts, type StockProductType } from "@/context/ProductProvider";

const Stock = () => {
  const { stockProducts } = useProducts();
  return (
    <div>
      <h2 className="text-center text-3xl font-medium mb-2">Stocks</h2>
      <div className="flex items-center justify-center">
        <table border={1}>
          <thead className="border-2">
            <tr>
              <th className="border-2 px-4 py-2 text-left">Name</th>
              <th className="border-2 px-4 py-2 text-left">Price</th>
              <th className="border-2 px-4 py-2 text-left">Current Stock</th>
            </tr>
          </thead>
          <tbody>
            {stockProducts.map((prod: StockProductType) => {
              return (
                <tr key={prod.stock_id}>
                  <td className="border-2 px-4 py-2 text-left">{prod.name}</td>
                  <td className="border-2 px-4 py-2 text-left">{prod.price}</td>
                  <td className="border-2 px-4 py-2 text-left">
                    {prod.stockValue}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;
