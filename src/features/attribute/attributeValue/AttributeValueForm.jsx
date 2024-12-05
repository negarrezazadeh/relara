import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Card from "@/ui/Card";
import { useForm } from "react-hook-form";
import useAddAttributeValue from "./useAddAttributeValue";
import useUpdateAttributeValue from "./useUpdateAttributeValue";

function AttributeValueForm({ attribute, isEditing, attributeValue }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing
      ? { value: attributeValue?.value }
      : {}, 
  });    

  const { addAttributeValue, isPending } = useAddAttributeValue();
  const { updateAttributeValue, isPending: updatePending } =
    useUpdateAttributeValue();

  const onSubmit = (data) => {
    if (isEditing) {
      updateAttributeValue({ data, id: attributeValue.id });
    } else {      
      // if(data.value === attributeValue.value) return
      addAttributeValue({ ...data, attribute_id: attribute.id });
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Main Attribute Name Field */}
        <div>
          <p className="border-l border-gray-600 pl-2 font-semibold">
            {attribute.name}
          </p>
        </div>
        {/* Value Field */}
        <div className="mt-4">
          <Label htmlFor="value">Attribute Value</Label>
          <Input
            id="value"
            className="mt-2"
            type="text"
            placeholder="Attribute Name"
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
    </Card>
  );
}

export default AttributeValueForm;
