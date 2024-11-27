import LoginForm from "@/features/authentication/LoginForm";

function LoginPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
