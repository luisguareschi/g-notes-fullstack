"use client";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Navbar } from "@/components/common/navbar/navbar";
import { SyncVaults } from "@/components/common/sync-vaults";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (!isPending && !session) {
    router.replace("/login");
  }

  return (
    <>
      {children}
      <Navbar />
      <SyncVaults />
    </>
  );
}
