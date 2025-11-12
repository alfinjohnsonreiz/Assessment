import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";
import type { ProductType } from "./DisplayProduct";
import { useEffect, useState } from "react";
import { updateProductApi } from "@/api/modules/product.api";
import { toast } from "react-toastify";
import { useProducts } from "@/context/ProductProvider";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: ProductType | null;
}

export function UpdateModal({
  open,
  setOpen,
  selectedProduct,
}: Props) {
  
  const [name, setName] = useState(selectedProduct?.name || "");
  const [description, setDescription] = useState(
    selectedProduct?.description || ""
  );
  const [error, setError] = useState("");

  const{fetchingProducts}=useProducts()
  useEffect(() => {
    setName(selectedProduct?.name || "");
    setDescription(selectedProduct?.description || "");
  }, [selectedProduct]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setError("");
    try {
      const response = await updateProductApi(selectedProduct.product_id, {
        name: name,
        description: description,
      });
      if (response.sucess) {
        toast.success("Updated SuccessFully");
      }

      setOpen(false);
    } catch (error) {
      console.error(error);
      setError("Failed to update product. Check console for details.");
    }
    finally{
        fetchingProducts()
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product details and click save.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
