import { LoginForm } from "@/components/common/login-form";
import { ModeToggle } from "@/components/mode-toggle";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-2 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
      <ModeToggle className="absolute top-4 right-4" />
    </div>
  );
}
