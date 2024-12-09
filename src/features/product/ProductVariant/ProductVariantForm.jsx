import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useAttributes from "@/features/attribute/useAttributes";
import Card from "@/ui/Card";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import Loader from "@/ui/Loader";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";

function ProductVariantForm({ product }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { attributes, isLoading } = useAttributes();

  if (isLoading) return <Loader />;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Card>
      <p className="border-l border-gray-600 pl-2 text-xl font-semibold text-violet-500">
        {product.name}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* variant accordion */}
        <Accordion type="multiple" className="mt-5">
          {attributes.map((attribute, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
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
                      className="mt-3 flex flex-col gap-2"
                    >
                      {attribute.values.map((value, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={value.value}
                            id={`${attribute.name}-${value.value}`}
                          />
                          <Label htmlFor={`${attribute.name}-${value.value}`}>
                            {value.value}
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

        {/* price */}
        <div className="my-6">
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

        {/* دکمه ثبت */}
        <Button
          type="submit"
          className="mt-5 w-full bg-gray-200 text-black hover:bg-gray-400"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default ProductVariantForm;
