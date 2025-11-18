import type { SaleData } from "../bill/Bill";
interface RecentSaleProps {
  sales: SaleData[];
}

const RecentSale = ({ sales }: RecentSaleProps) => {
  return (
    <table className="w-[50%">
      <thead>
        <tr className="text-center border">
          <th className="text-center  px-2 py-2">Sale created</th>
          <th className="text-left  px-2 py-2">Sale amount</th>
          <th className="text-left  px-2 py-2">No.of Sale items</th>
        </tr>
      </thead>
      <tbody>
        {sales.slice(0,10).map((sale) => (
          <tr className="text-center border">
            <td className="text-left  px-2 py-2">{new Date(sale.createdAt).toLocaleDateString()}</td>
            <td className="text-left  px-2 py-2">{sale.paidAmount}</td>
            <td className="text-left  px-2 py-2">
              {sale?.saleItems?.length ? sale.saleItems.length : 0}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentSale;
