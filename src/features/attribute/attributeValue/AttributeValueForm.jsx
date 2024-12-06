import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Card from "@/ui/Card";
import Loader from "@/ui/Loader";
import useAddAttributeValue from "./useAddAttributeValue";
import useUpdateAttributeValue from "./useUpdateAttributeValue";
import useAttributeValues from "./useAttributeValues";

function AttributeValueForm({ attribute, isEditing, attributeValue }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    defaultValues: isEditing ? { value: attributeValue?.value } : {},
  });

  const { addAttributeValue, isPending } = useAddAttributeValue();
  const { updateAttributeValue, isPending: updatePending } =
    useUpdateAttributeValue();
  const { attributeValues, isLoading } = useAttributeValues();

  const onSubmit = (data) => {
    if (isLoading) return <Loader />;

    // Check for duplicate values
    const isDuplicate = attributeValues.some(
      (val) => val.value.toLowerCase() === data.value.toLowerCase(),
    );
    if (isDuplicate) {
      setError("value", { message: "Attribute value already exists!" });
      return;
    }

    // Check if the entered value is a parent
    const isParent = attributeValues.some(
      (val) => val.attribute_name.toLowerCase() === data.value.toLowerCase(),
    );
    if (isParent) {
      setError("value", { message: "This Attribute is already a parent." });
      return;
    }

    // Call add or update function
    if (isEditing) {
      updateAttributeValue({ data, id: attributeValue.id });
    } else {
      addAttributeValue({ ...data, attribute_id: attribute.id });
      reset();
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Value Field */}
        <div className="mt-4">
          <Label htmlFor="value">Attribute Value</Label>
          <Input
            id="value"
            className="my-2"
            type="text"
            placeholder="Attribute value Name"
            {...register("value", {
              required: "Value is required",
            })}
          />
          {errors.value && (
            <p className="mt-2 text-sm text-red-500">{errors.value.message}</p>
          )}
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
      {/* Main Attribute Name Field */}
      {!isEditing && (
        <div className="mt-5 border-l border-gray-600 pl-2">
          <p className="rounded-lg bg-gray-300 px-3 py-2 pl-2 text-sm font-semibold text-violet-600">
            {attribute?.name}
          </p>

          <ul className="border-l border-gray-600 pl-2">
            {attribute?.values.map((value) => (
              <li
                key={value.id}
                className="mt-2 rounded-lg bg-gray-700 px-3 py-2 pl-2 text-sm"
              >
                <p className="text-sm">{value.value}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

export default AttributeValueForm;
