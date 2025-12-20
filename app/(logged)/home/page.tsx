"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleUser } from "lucide-react";
import { AccountMenuCardGroup } from "@/components/common/account-menu-card-group";
import { RecentlyAddedAccounts } from "@/components/common/recently-added-accounts";

const Home = () => {
  return (
    <div className="flex flex-col justify-start h-svh p-4 gap-4">
      <section className="flex w-full">
        <Button variant="text" size="default" className="p-0">
          G Notes
        </Button>
        <ModeToggle className="ml-auto" />
        <Button variant="text" size="icon">
          <CircleUser className="min-w-6 min-h-6" />
        </Button>
      </section>
      <h1 className="text-3xl font-bold">Passwords</h1>
      <Input placeholder="Search" className="text-base" />
      <AccountMenuCardGroup />
      <RecentlyAddedAccounts />
    </div>
  );
};

export default Home;
