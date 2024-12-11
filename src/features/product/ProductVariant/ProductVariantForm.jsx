import { Controller, useForm } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAttributes from "@/features/attribute/useAttributes";
import Card from "@/ui/Card";
import Loader from "@/ui/Loader";
import { Select2 } from "@/ui/Select2";
import useProductVariantAdd from "./useProductVariantAdd";
import useProductVariantUpdate from "./useProductVariantUpdate";

function ProductVariantForm({ product, isEditing, ProductAttributes }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing
      ? {
          attributes: ProductAttributes || {},
          price: product.price || "",
          stock: product.stock || "",
          status: product.status || "available",
        }
      : {},
  });

  const { attributes, isLoading } = useAttributes();
  const { addProductVariant, isPending } = useProductVariantAdd();
  const { updateProductVariant, isPending: updatePending } =
    useProductVariantUpdate();

  if (isLoading) return <Loader />;

  // Pass selected attribute ID
  const onSubmit = async (data) => {
    const attributeValues = Object.values(data.attributes || {}).map(
      (id) => id,
    );

    const finalData = {
      product_id: product.id,
      attribute_values: attributeValues,
      price: data.price,
      stock: data.stock,
      status: data.status,
    };

    if (isEditing) {
      updateProductVariant({ id: product.id, data: finalData });
      return;
    } else {
      addProductVariant(finalData);
    }
  };

  return (
    <Card>
      <p className="border-l border-gray-600 pl-2 text-xl font-semibold text-violet-500">
        {product.name || product.product_name}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion type="multiple" className="mt-5">
          {attributes.map((attribute, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-600/70 last:border-b-0"
            >
              <AccordionTrigger>{attribute.name}</AccordionTrigger>
              <AccordionContent>
                <Controller
                  name={`attributes.${attribute.name}`}
                  control={control}
                  rules={{ required: `${attribute.name} is required` }}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="mt-3 flex flex-col gap-3"
                    >
                      {attribute.values.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={item.id.toString()} // Ensure ID is string
                            id={`${attribute.name}-${item.value}`}
                          />
                          <Label
                            htmlFor={`${attribute.name}-${item.value}`}
                            className="text-sm text-gray-300"
                          >
                            {item.value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.attributes?.[attribute.name] && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.attributes[attribute.name]?.message}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Rest of the form */}
        <div className="flex gap-5 lg:items-center mt-5 w-full flex-col lg:flex-row">
          <div className="lg:my-6">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price"
              {...register("price", {
                required: "Price is required",
              })}
              className="my-2"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="lg:my-6">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              placeholder="Enter Stock"
              {...register("stock", {
                required: "Stock is required",
              })}
              className="my-2"
            />
            {errors.stock && (
              <p className="text-sm text-red-500">{errors.stock.message}</p>
            )}
          </div>

          <div className="flex flex-col lg:my-6">
            <Label className="mb-2">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select2
                  list={[
                    { id: "unavailable", name: "unavailable" },
                    { id: "call", name: "call" },
                  ]}
                  label="Status"
                  defaultItem={{ name: "available", value: "available" }}
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                />
              )}
            />
          </div>
        </div>

        <Button
          disabled={isPending || updatePending}
          type="submit"
          className="my-5 w-56 bg-gray-200 text-black hover:bg-gray-400"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default ProductVariantForm;
