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

function CategoryForm({ category }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: category?.name || "",
      category: category?.parent_id || null,
    },
  });

  const { addCategory, isPending } = useAddCategory();
  const { updateCategory, isPending: updatePending } = useUpdateCategory();
  const { allCategories, isLoading } = useCategoriesAll();

  if (isLoading) return <Loader />;

  const onSubmit = (data) => {
    const categoryData = {
      name: data.name,
      parent_id: category?.children?.length > 0 ? category.parent_id : data.category,
    };

    if (category) {
      updateCategory({ id: category.id, data: categoryData });
    } else {
      addCategory(categoryData);
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
            className="mt-2"
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

        {/* Category Selector */}
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
                defaultItem={{ name: "Main Category", value: null }}
                onChange={(value) => field.onChange(value)}
                // disabled={category?.children?.length > 0} // Disable if it's a Parent
              />
            )}
          />
          {category?.children?.length > 0 && (
            <p className="text-sm text-yellow-500">
              This category has subcategories. Its parent category cannot be changed.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          disabled={isPending || updatePending || category?.children?.length > 0 }
          type="submit"
          className="mt-5 w-60 bg-white text-black hover:bg-gray-300"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default CategoryForm;

