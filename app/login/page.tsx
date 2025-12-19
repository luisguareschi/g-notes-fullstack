import { LoginForm } from "@/components/common/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-2 md:p-10 bg-ios-gray-50 dark:bg-black">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
