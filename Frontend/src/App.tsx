import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import AddProduct from "./pages/Product/AddProduct";
import DisplayProduct from "./pages/Product/DisplayProduct";
import { ToastContainer } from "react-toastify";
import ProductProvider from "./context/ProductProvider";
import Purchase from "./pages/purchase/Purchase";
import NewPurchase from "./pages/purchase/NewPurchase";
import Stock from "./pages/stock/Stock";
import Sale from "./pages/Sale/Sale";
import Bill from "./pages/bill/Bill";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <ProductProvider>
      <Routes>
        {/* All pages that share the same Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products" element={<DisplayProduct />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/newpurchase" element={<NewPurchase />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/bill" element={<Bill />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </ProductProvider>
  );
}

export default App;
