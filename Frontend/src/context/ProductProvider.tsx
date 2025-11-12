import { fetchAllProductsApi } from "@/api/modules/product.api";
import type { ProductType } from "@/pages/Product/DisplayProduct";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ProductcontextType = {
  products: ProductType[] | null;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[] | null>>;
};

export const ProductContext = createContext<ProductcontextType | undefined>(
  undefined
);

interface ProductProviderProps {
  children: ReactNode;
}
const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]| null>([]);

  const fetchingProducts = async () => {
    const response = await fetchAllProductsApi();
    console.log("Response",response.data)
    setProducts(response.data);
  };
  
  useEffect(() => {
    fetchingProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products,setProducts }}>
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
