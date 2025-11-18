import { fetchAllProductsApi } from "@/api/modules/product.api";
import { fetchStockApi } from "@/api/modules/stock.api";
import type { ProductType } from "@/pages/Product/DisplayProduct";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface StockProductType {
  stock_id: string;
  product: ProductType | null;
  stockValue: number;
  name: string;
  price: number;
}
type ProductcontextType = {
  products: ProductType[] | null;
  stockProducts: StockProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[] | null>>;
  fetchingProducts: () => void;
  fetchingStocks: () => void;
};

export const ProductContext = createContext<ProductcontextType | undefined>(
  undefined
);

interface ProductProviderProps {
  children: ReactNode;
}
const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[] | null>([]);
  const [stockProducts, setStockProduct] = useState<StockProductType[]>([]);

  const fetchingProducts = async () => {
    const response = await fetchAllProductsApi();
    setProducts(response.data);
  };

  const fetchingStocks = async () => {
    try {
      const data = await fetchStockApi();
      setStockProduct(data.data);
    } catch (error) {
      console.error("Failed to fetch stocks:", error);
    }
  };

  useEffect(() => {
    fetchingProducts();
    fetchingStocks();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, stockProducts, setProducts, fetchingProducts ,fetchingStocks}}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a product provider");
  }
  return context;
};
