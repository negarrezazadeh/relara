import LoginForm from "@/features/authentication/LoginForm";

function Login() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <LoginForm />
    </div>
  );
}

export default Login;
