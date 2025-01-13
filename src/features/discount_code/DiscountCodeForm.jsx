import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Card from "@/ui/Card";
import { Select2 } from "@/ui/Select2";
import { Controller, useForm } from "react-hook-form";
import useAddDiscountCode from "./useAddDiscountCode";
import useUpdateDiscountCode from "./useUpdateDiscountCode";

function DiscountCodeForm({ discountCode }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: {
          code: discountCode?.code || "",
          type: discountCode?.type || "fixed",
          value: discountCode?.value || "",
          min_cart_value: discountCode?.min_cart_value || "",
          max_discount_value: discountCode?.max_discount_value || "",
          usage_limit: discountCode?.usage_limit || "",
          expires_at: discountCode?.expires_at || "",
        }
  });

  const { addDiscountCode, isPending } = useAddDiscountCode();
  const { updateDiscountCode, isPending: isPendingUpdate } =
    useUpdateDiscountCode();

  const onSubmit = (data) => {
    if (discountCode) {
      updateDiscountCode({ id: discountCode.id, data });
      return;
    }
    
    addDiscountCode(data);
    reset();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="code">Name *</Label>
          <Input
            id="code"
            className="my-2"
            type="text"
            placeholder="Discount Code Name"
            {...register("code", {
              required: "Discount Code Name is required",
            })}
          />
          {errors.code && (
            <p className="text-sm text-red-500">{errors.code.message}</p>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-5">
          <div className="flex flex-col">
            <Label className="mb-2 text-base font-medium">Options</Label>
            <Controller
              name="type"
              control={control}
              defaultValue={"fixed"}
              render={({ field }) => (
                <Select2
                  list={[{ id: "percentage", name: "Percentage" }]}
                  label="Option"
                  defaultItem={{ name: "Fixed", value: "fixed" }}
                  onChange={(value) => field.onChange(value)}
                  value={field.value}
                />
              )}
            />
          </div>

          <div>
            <Label htmlFor="value">Value *</Label>
            <Input
              id="value"
              className="my-2"
              type="number"
              placeholder="Discount Code Value"
              {...register("value", {
                required: "Discount code value is required",
              })}
            />
            {errors.value && (
              <p className="text-sm text-red-500">{errors.value.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="min_cart_value">Minimum cart total amount</Label>
            <Input
              id="min_cart_value"
              className="my-2"
              type="nu"
              placeholder="Minimum cart total amount"
              {...register("min_cart_value")}
            />
          </div>

          <div>
            <Label htmlFor="max_discount_value">Maximum discount amount</Label>
            <Input
              id="max_discount_value"
              className="my-2"
              type="number"
              {...register("max_discount_value")}
            />
          </div>

          <div>
            <Label htmlFor="usage_limit">Usage Limit</Label>
            <Input
              id="usage_limit"
              className="my-2"
              type="number"
              {...register("usage_limit")}
            />
          </div>

          <div>
            <Label htmlFor="expires_at">Expire at</Label>
            <Input
              id="expires_at"
              className="my-2"
              type="number"
              placeholder="days"
              {...register("expires_at")}
            />
          </div>
        </div>

        <Button
          disabled={isPending || isPendingUpdate}
          type="submit"
          className="mt-10 w-52 bg-white text-black hover:bg-gray-300"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default DiscountCodeForm;
