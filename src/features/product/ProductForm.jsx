import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Card from "@/ui/Card";
import useProductAdd from "./useProductAdd";
import useProductUpdate from "./useProductUpdate";
import useProducts from "./useProducts";
import useCategoriesAll from "../category/useCategoriesAll";
import Loader from "@/ui/Loader";
import { MultiSelect } from "@/ui/MultiSelect";
import MediaForm from "../media/MediaForm";

function ProductForm({ product }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
    reset,
  } = useForm({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      categories: product?.categories?.map((cat) => cat.id) || [],
    },
  });

  const { addProduct, isPending } = useProductAdd();
  const { updateProduct, isPending: updatePending } = useProductUpdate();
  const { allCategories, isLoading } = useCategoriesAll();
  const { products } = useProducts();
  const [images, setImages] = useState(product?.images || []);

  if (isLoading) return <Loader />;

  const onSubmit = (data) => {
    // Trimmed Name
    const trimmedName = data.name.trim();

    // Check for primary image
    const hasPrimary = images.find((img) => img.is_primary);
    if (!hasPrimary && images.length > 0) {
      images[0].is_primary = true;
    }
    
    const finalData = { ...data, images: images };    

    // Call add or update function
    if (product) {
      updateProduct({ data: finalData, id: product.id });
      return;
    }
    // Check for duplicate products
    const isDuplicate = products.some(
      (pro) => pro.name.toLowerCase().trim() === trimmedName.toLowerCase(),
    );
    if (isDuplicate) {
      setError("name", { message: "This Product Name is already in use." });
      return;
    }

    addProduct(finalData);
    reset();
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

        {/* Category Field */}
        <div className="my-8 flex flex-col gap-3">
          <Label>Category</Label>
          <Controller
            name="categories"
            control={control}
            render={({ field }) => (
              <MultiSelect
                list={allCategories}
                label="Category"
                defaultItems={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </div>

        <div className="mt-8">
          <MediaForm images={images} onSetImage={setImages} />
        </div>

        {/* Description Field */}
        <div className="mt-8">
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
