"use client";
import { BackButton } from "@/components/common/back-button";
import { ModeToggle } from "@/components/mode-toggle";
import { useSearchParams } from "next/navigation";

const AccountListPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  return (
    <div className="flex flex-col justify-start h-svh p-4 gap-4">
      <section className="flex w-full items-center">
        <BackButton />
        <ModeToggle className="ml-auto" />
      </section>
      <h1 className="text-3xl font-bold">Account List</h1>
    </div>
  );
};

export default AccountListPage;
