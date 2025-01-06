import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Card from "@/ui/Card";
import useAddUser from "@/features/user/useAddUser";
import useUpdateUser from "./useUpdateUser";


function UserForm({ user }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: user || { role: "" },
  });

  const { addUser, isPending } = useAddUser();
  const { updateUser, isPending: updatePending } = useUpdateUser();

  const onSubmit = (data) => {
    if (user) {
      updateUser({ data, id: user.id });
    } else {
      addUser(data);
    }
  };

  return (
    <Card>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input className="mt-2" placeholder="Name" {...register("name")} />
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            className="mt-2"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
            })}
          />
          <p className="text-sm text-red-500">{errors.email?.message}</p>
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            className="mt-2"
            placeholder="Phone"
            {...register("phone", {
              pattern: { value: /^09\d{9}$/, message: "Phone number must be valid" },
            })}
          />
          <p className="text-sm text-red-500">{errors.phone?.message}</p>
        </div>

        <div>
          <Label htmlFor="nationalCode">National Code</Label>
          <Input
            className="mt-2"
            placeholder="National Code"
            {...register("nationalCode", {
              pattern: { value: /^\d{10}$/, message: "National code must be exactly 10 digits" },
            })}
          />
          <p className="text-sm text-red-500">
            {errors.nationalCode?.message}
          </p>
        </div>

        <div>
          <Label htmlFor="password">Password *</Label>
          <Input
            className="mt-2"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              validate: (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value) || "Password must include uppercase, lowercase letters, and a number",
            })}
          />
          <p className="text-sm text-red-500">{errors.password?.message}</p>
        </div>

        <div>
          <Label>Role *</Label>
          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="mt-2 w-[180px] border-gray-600">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <p className="text-sm text-red-500">{errors.role?.message}</p>
        </div>

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

export default UserForm;

