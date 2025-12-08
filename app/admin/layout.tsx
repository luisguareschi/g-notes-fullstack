"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { AdminLoginForm } from "@/components/common/admin-login-form";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    if (session?.user && session?.user?.role !== "ADMIN") {
      toast.error("You are not authorized to access this page");
      signOut();
    }
  }, [session]);

  if ((!isPending && !session) || (session && !isAdmin)) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <AdminLoginForm />
        </div>
      </div>
    );
  }

  return children;
}
