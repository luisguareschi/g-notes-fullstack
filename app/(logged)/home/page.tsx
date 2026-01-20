"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { AccountMenuCardGroup } from "@/components/common/account-menu-card-group";
import { RecentlyAddedAccounts } from "@/components/common/recently-added-accounts";
import { SelectVaultButton } from "@/components/common/select-vault-button";
import { ProfileButton } from "@/components/common/profile-button";
import { CreateAccountButton } from "@/components/common/create-account-button";
import { useState } from "react";
import { useGetAccountCredentials } from "@/orval/generated/account-credentials/account-credentials";
import { useLocalSettings } from "@/hooks/use-local-settings";
import { QUERY_KEYS } from "@/queries/queryKeys";
import { AccountsCredentialsList } from "@/components/common/accounts-credentials-list";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const selectedVaultId = useLocalSettings((state) => state.selectedVaultId);
  const { data: accountCredentials, isLoading: isLoadingAccountCredentials } =
    useGetAccountCredentials(
      {
        search: search ?? undefined,
        vaultId: selectedVaultId ?? undefined,
      },
      {
        query: {
          queryKey: [
            QUERY_KEYS.accountCredentialsList,
            selectedVaultId,
            search,
          ],
          enabled: !!selectedVaultId && !!search,
        },
      },
    );
  const handleAccountClick = (accountId: string) => {
    router.push(`/account-list/${accountId}`);
  };
  return (
    <div className="flex flex-col justify-start h-svh p-4 gap-4">
      <section className="flex w-full">
        <SelectVaultButton />
        <ModeToggle className="ml-auto" />
        <ProfileButton />
      </section>
      <h1 className="text-3xl font-bold">Passwords</h1>
      <Input
        placeholder="Search"
        className="text-base min-h-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <AnimatePresence>
        {!search && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4"
          >
            <AccountMenuCardGroup />
            <RecentlyAddedAccounts />
          </motion.div>
        )}
      </AnimatePresence>
      {search && (
        <AccountsCredentialsList
          accountCredentials={accountCredentials}
          isLoading={isLoadingAccountCredentials}
          handleAccountClick={handleAccountClick}
        />
      )}
      <CreateAccountButton />
    </div>
  );
};

export default Home;
