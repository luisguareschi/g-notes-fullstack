"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleUser } from "lucide-react";
import { AccountMenuCardGroup } from "@/components/common/account-menu-card-group";
import { RecentlyAddedAccounts } from "@/components/common/recently-added-accounts";
import { SelectVaultButton } from "@/components/common/select-vault-button";
import Link from "next/link";
import { ProfileButton } from "@/components/common/profile-button";

const Home = () => {
  return (
    <div className="flex flex-col justify-start h-svh p-4 gap-4">
      <section className="flex w-full">
        <SelectVaultButton />
        <ModeToggle className="ml-auto" />
        <ProfileButton />
      </section>
      <h1 className="text-3xl font-bold">Passwords</h1>
      <Input placeholder="Search" className="text-base" />
      <AccountMenuCardGroup />
      <RecentlyAddedAccounts />
    </div>
  );
};

export default Home;
