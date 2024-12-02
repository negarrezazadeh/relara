import { Controller, useForm } from "react-hook-form";
import Card from "@/ui/Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAddCategory from "./useAddCategory";
import useCategoriesAll from "./useCategoriesAll";
import { Select2 } from "@/ui/Select2";

function CategoryAdd() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { addCategory, isPending } = useAddCategory();
  const { allCategories, isLoading } = useCategoriesAll();

  if (isLoading) return <p>Loading categories...</p>;

  const onSubmit = (data) => {
    const categoryData = {
      name: data.name,
      parent_id: data.category === 0 ? null : data.category,
    };
    
    addCategory(categoryData);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              />
            )}
          />
        </div>

        <Button
          disabled={isPending}
          type="submit"
          className="mt-5 w-60 bg-white text-black hover:bg-gray-300"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default CategoryAdd;
