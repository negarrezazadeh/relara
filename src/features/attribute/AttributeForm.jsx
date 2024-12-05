import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Card from "@/ui/Card";
import { useForm } from "react-hook-form";
import useAttributeAdd from "./useAttributeAdd";
import useAttributeUpdate from "./useAttributeUpdate";
import useAttributes from "./useAttributes";
import useAttributeValues from "./attributeValue/useAttributeValues";

function AttributeForm({ attribute }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      name: attribute?.name || "",
    },
  });

  const { addAttribute, isPending } = useAttributeAdd();
  const { updateAttribute, isPending: updatePending } = useAttributeUpdate();
  const {attributes} = useAttributes()
  const {attributeValues} = useAttributeValues()

  const onSubmit = (data) => {    
    // Check for duplicate categories
    const isDuplicate = attributes.some(
      (attr) => attr.name.toLowerCase() === data.name.toLowerCase()
    );
    if (isDuplicate) {
      setError("name", { message: "This Attribute is already in use." });
      return;
    }

    // Check if the entered value is a SubAttribute
    const isSubAttribute = attributeValues.some(
      (attr) => attr.value.toLowerCase() === data.name.toLowerCase()
    )
    if (isSubAttribute) {
      setError("name", { message: "This Attribute is already a SubAttribute." });
      return;
    }

    // Call add or update function
    if (attribute) {
      updateAttribute({ data, id: attribute.id });
    } else {
      addAttribute(data);
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
            placeholder="Category Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
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

export default AttributeForm;
