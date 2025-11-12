import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import AddProduct from "./pages/Product/AddProduct";
import DisplayProduct from "./pages/Product/DisplayProduct";
import { ToastContainer } from "react-toastify";
import ProductProvider from "./context/ProductProvider";
import Purchase from "./pages/purchase/Purchase";

function App() {
  return (
    <ProductProvider>
      <Routes>
        {/* All pages that share the same Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<AddProduct />} />
          <Route path="/products" element={<DisplayProduct />} />
          <Route path="/purchase" element={<Purchase />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </ProductProvider>
  );
}

export default App;
