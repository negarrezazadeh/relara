import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Card from "@/ui/Card";
import useProductAdd from "./useProductAdd";
import useProductUpdate from "./useProductUpdate";
import useProducts from "./useProducts";

function ProductForm({ product }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "", 
    },
  });

  const { addProduct, isPending } = useProductAdd();
  const { updateProduct, isPending: updatePending } = useProductUpdate();
  const { products } = useProducts();

  const onSubmit = (data) => {    
    // Trimmed Name
    const trimmedName = data.name.trim();
    
    // Call add or update function
    if (product) {
      updateProduct({ data, id: product.id });
    } else {
      // Check for duplicate categories
      const isDuplicate = products.some(
        (pro) => pro.name.toLowerCase().trim() === trimmedName.toLowerCase(),
      );
      if (isDuplicate) {
        setError("name", { message: "This Product Name is already in use." });
        return;
      }
      addProduct(data);
      reset();
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            className="my-2"
            type="text"
            placeholder="Product Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="mt-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            className="my-2 resize-none border border-gray-600 placeholder:text-gray-500"
            placeholder="Enter product description..."
            rows="4"
            {...register("description")}
          />
        </div>

        {/* Submit Button */}
        <Button
          disabled={isPending || updatePending}
          type="submit"
          className="mt-5 w-60 bg-white text-black hover:bg-gray-300"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default ProductForm;
