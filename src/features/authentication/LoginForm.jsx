import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const { isPending, login } = useLogin();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        navigate("/dashboard")
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <>
      <div className="h-80 w-80 rounded-sm border border-gray-600 bg-gray-900 p-5">
        <p className="mb-10 mt-5 text-center text-2xl font-semibold text-white">
          Login
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="email" placeholder="Email" {...register("email")} />
          <Input
            type="password"
            placeholder="Password"
            className="mt-5"
            {...register("password")}
          />
          <Button variant="outline" className="my-5 w-full" type="submit" disabled={isPending}>
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
