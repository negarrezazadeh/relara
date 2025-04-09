import { Controller, useForm } from "react-hook-form";

import Card from "@/ui/Card";
import Loader from "@/ui/Loader";
import { Select2 } from "@/ui/Select2";
import useAddCategory from "./useAddCategory";
import useCategoriesAll from "./useCategoriesAll";
import useUpdateCategory from "./useUpdateCategory";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

function CategoryForm({ category }) {
  const [searchParams] = useSearchParams();
  const subCatId = Number(searchParams.get("category"));

  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      name: category?.name || "",
      category: subCatId || category?.parent_id || 0,
    },
  });
  
  
  const { addCategory, isPending } = useAddCategory();
  const { updateCategory, isPending: updatePending } = useUpdateCategory();
  const { allCategories, isLoading } = useCategoriesAll();
  
  if (isLoading) return <Loader />;

  const onSubmit = (data) => {
    // Check for duplicate categories
    const isDuplicate = allCategories.some(
      (cat) =>
        cat.name.toLowerCase() === data.name.toLowerCase() &&
        cat.id !== category?.id,
    );

    if (isDuplicate) {
      setError("name", { message: "This Category is already in use." });
      return;
    }

    // Call add or update function
    const categoryData = {
      name: data.name,
      parent_id: data.category === 0 ? null : data.category,
    };

    if (category) {
      updateCategory({ id: category.id, data: categoryData });
    } else {
      addCategory(categoryData);
      reset();
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            className="my-2"
            type="text"
            placeholder="Category Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <Label>Category</Label>

          <Controller
            name="category"
            defaultValue={0}
            control={control}
            render={({ field }) => (
              <Select2
                list={allCategories}
                label="Category"
                defaultItem={{ name: "Main Category", value: 0 }}
                onChange={(value) => field.onChange(value)}
                value={field.value}
                disabled={category?.children?.length > 0}
                contentWidth="w-[200px]"
              />
            )}
          />

          {category?.children?.length > 0 && (
            <p className="text-sm text-yellow-500">
              This category has subcategories. Its parent category cannot be
              changed.
            </p>
          )}
        </div>

        <Button
          disabled={isPending || updatePending}
          type="submit"
          className="mt-10 w-52 bg-white text-black hover:bg-gray-300"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default CategoryForm;
