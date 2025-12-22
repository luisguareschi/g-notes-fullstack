"use client";
import { BackButton } from "@/components/common/back-button";
import { ModeToggle } from "@/components/mode-toggle";
import { ProfileButton } from "@/components/common/profile-button";

const ManageVaultPage = () => {
  return (
    <div className="flex flex-col justify-start h-svh p-4 gap-4">
      <section className="flex w-full">
        <BackButton />
        <ModeToggle className="ml-auto" />
        <ProfileButton />
      </section>
      <h1 className="text-3xl font-bold">Manage Vault</h1>
    </div>
  );
};

export default ManageVaultPage;
