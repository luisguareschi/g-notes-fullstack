"use client";
import { useEffect } from "react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AdminLogout = () => {
  const router = useRouter();
  useEffect(() => {
    signOut();
    router.push("/admin");
  }, []);
};

export default AdminLogout;
