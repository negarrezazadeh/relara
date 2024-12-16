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
      <p className="border-l border-gray-600 pl-2 text-xl font-semibold text-violet-500 mt-2">
        {product.name || product.product_name}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion type="multiple" className="my-10">
          {attributes.map((attribute, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="mb-3 rounded border border-gray-600 bg-gray-600/30"
            >
              <AccordionTrigger>
                <p className="text-gray-100/90"> {attribute.name}</p>
              </AccordionTrigger>
              <AccordionContent>
                <Controller
                  name={`attributes.${attribute.name}`}
                  control={control}
                  rules={{ required: `${attribute.name} is required` }}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="mt-3 flex flex-col gap-3 pl-2"
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

        {/* Price, Stock, and Status Section */}
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Label htmlFor="price" className="text-base font-medium">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price"
              {...register("price", { required: "Price is required" })}
              className="mt-2 border-gray-400"
            />
            {errors.price && (
              <p className="mt-2 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="stock" className="text-base font-medium">
              Stock
            </Label>
            <Input
              id="stock"
              type="number"
              placeholder="Enter stock"
              {...register("stock", { required: "Stock is required" })}
              className="mt-2 border-gray-400"
            />
            {errors.stock && (
              <p className="mt-2 text-sm text-red-500">
                {errors.stock.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <Label className="mb-2 text-base font-medium">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select2
                  list={[
                    { id: "unavailable", name: "Unavailable" },
                    { id: "call", name: "Call" },
                  ]}
                  label="Status"
                  defaultItem={{ name: "Available", value: "available" }}
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                />
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            disabled={isPending || updatePending}
            type="submit"
            className="mt-12 mb-5 w-52 rounded-lg bg-violet-500 px-4 py-2 text-base text-white shadow-md hover:bg-violet-600"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default ProductVariantForm;
