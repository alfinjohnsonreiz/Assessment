import React, { useState } from "react";
import { useProducts } from "@/context/ProductProvider";
import { UpdateModal } from "./UpdateModal";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteProd } from "./ConfirmDeleteProd";
import { deleteProductApi } from "@/api/modules/product.api";
import { toast } from "react-toastify";

export interface ProductType {
  product_id: string;
  name: string;
  description: string;
  price: string;
  currentStock: boolean;
  taxPercentage: string;
  createdAt: string;
}

const DisplayProduct: React.FC = () => {
  const { products,fetchingProducts } = useProducts();
  const [productId,setProductId]=useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
  null
  );
  const [open, setOpen] = useState(false);
  const[openDelete,setOpenDelete]=useState(false);

  if (!products) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  const handleUpdateClick = (product: ProductType) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  const handleDeleteModal=(product_id:string)=>{
    setProductId(product_id)
    setOpenDelete(true)

  }
  const handleDelete=async()=>{
    try {
      const response=await deleteProductApi(productId);
      console.log("Response form delete",response)
      if(response.success){
        toast.success("Product deleted")
      }
    } catch (error) {
      console.log("error deleting",error)
      toast.error("Error Deelting product")
    }finally{
      fetchingProducts()
    }
  }
  return (
    <div className="">
      <div className="flex justify-center gap-2 ">
        <h2 className="text-2xl ">Products</h2>
        {/* <Button>Add Product</Button> */}
      </div>

      <table className="w-full mt-3 border">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-left">Price</th>
            <th className="border px-4 py-2 text-left">Stock</th>
            <th className="border px-4 py-2 text-left">Tax %</th>
            <th className="border px-4 py-2 text-left">Created At</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: ProductType) => (
            <tr key={product.product_id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">
                {product.currentStock ? "Available" : "Out of Stock"}
              </td>
              <td className="border px-4 py-2">{product.taxPercentage}</td>
              <td className="border px-4 py-2">
                {new Date(product.createdAt).toLocaleString()}
              </td>
              <td>
                <div>
                  <Button onClick={() => handleUpdateClick(product)}>
                    update
                  </Button>
                  <Button onClick={()=>handleDeleteModal(product.product_id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateModal
        open={open}
        setOpen={setOpen}
        selectedProduct={selectedProduct}
      />
      <ConfirmDeleteProd open={openDelete} setOpen={setOpenDelete} handleDelete={handleDelete}
      />
    </div>
  );
};

export default DisplayProduct;
