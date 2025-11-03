"use client";
import { useSession } from "@/lib/auth-client";
import { AdminLoginForm } from "@/components/common/admin-login-form";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  if (!isPending && !session) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <AdminLoginForm />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
