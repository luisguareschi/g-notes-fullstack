"use client";
import { BackButton } from "@/components/common/back-button";
import { ModeToggle } from "@/components/mode-toggle";
import { GetAccountCredentialsType } from "@/orval/generated/openAPI.schemas";
import { useRouter, useSearchParams } from "next/navigation";
import z from "zod";
import {
  useDeleteAccountCredentialsId,
  useGetAccountCredentials,
} from "@/orval/generated/account-credentials/account-credentials";
import { useLocalSettings } from "@/hooks/use-local-settings";
import { QUERY_KEYS } from "@/queries/queryKeys";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { CreateAccountButton } from "@/components/common/create-account-button";
import { AccountsCredentialsList } from "@/components/common/accounts-credentials-list";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const AccountListPageQueryParams = z.object({
  type: z
    .enum([
      GetAccountCredentialsType.account,
      GetAccountCredentialsType.bankAccount,
    ])
    .optional()
    .nullable(),
});

const AccountListPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { type } = AccountListPageQueryParams.parse(
    Object.fromEntries(searchParams),
  );
  const selectedVaultId = useLocalSettings((state) => state.selectedVaultId);
  const [search, setSearch] = useState("");
  const { data: accountCredentials, isLoading: isLoadingAccountCredentials } =
    useGetAccountCredentials(
      {
        vaultId: selectedVaultId ?? undefined,
        type: type ?? undefined,
        search: search ?? undefined,
      },
      {
        query: {
          queryKey: [
            QUERY_KEYS.accountCredentialsList,
            selectedVaultId,
            type,
            search,
          ],
          enabled: !!selectedVaultId,
        },
      },
    );

  const queryClient = useQueryClient();
  const { mutate: deleteAccountCredentials } = useDeleteAccountCredentialsId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.accountCredentialsList],
        });
        toast.success("Account credentials deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete account credentials");
      },
    },
  });

  const title = useMemo(() => {
    switch (type) {
      case GetAccountCredentialsType.account:
        return "Passwords";
      case GetAccountCredentialsType.bankAccount:
        return "Bank Accounts";
    }
    return "All Accounts";
  }, [type]);

  const handleAccountClick = (accountId: string) => {
    router.push(`/account-list/${accountId}`);
  };

  const handleDeleteAccount = (accountId: string) => {
    deleteAccountCredentials({ id: accountId });
  };

  return (
    <div className="flex flex-col justify-start min-h-svh p-4 gap-4">
      <section className="flex w-full items-center">
        <BackButton />
        <ModeToggle className="ml-auto" />
      </section>
      <h1 className="text-3xl font-bold">{title}</h1>
      <Input
        placeholder="Search"
        className="text-base"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <AccountsCredentialsList
        accountCredentials={accountCredentials}
        isLoading={isLoadingAccountCredentials}
        handleAccountClick={handleAccountClick}
        handleDeleteAccount={handleDeleteAccount}
      />
      <CreateAccountButton removeNavbarPadding />
    </div>
  );
};

export default AccountListPage;
