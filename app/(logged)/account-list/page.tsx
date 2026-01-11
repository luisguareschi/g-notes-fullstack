"use client";
import { BackButton } from "@/components/common/back-button";
import { ModeToggle } from "@/components/mode-toggle";
import { GetAccountCredentialsType } from "@/orval/generated/openAPI.schemas";
import { useRouter, useSearchParams } from "next/navigation";
import z from "zod";
import { useGetAccountCredentials } from "@/orval/generated/account-credentials/account-credentials";
import { useLocalSettings } from "@/hooks/use-local-settings";
import { QUERY_KEYS } from "@/queries/queryKeys";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { IOSFormCard } from "@/components/common/ios-form/ios-form-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";
import { CreateAccountButton } from "@/components/common/create-account-button";

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
      {!!accountCredentials?.length && !isLoadingAccountCredentials && (
        <IOSFormCard fullWidthSeparator className="mb-30">
          {accountCredentials?.map((account) => {
            return (
              <div
                key={account.id}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleAccountClick(account.id)}
              >
                <Avatar className="size-9">
                  <AvatarFallback className="uppercase">
                    {account.name.charAt(0)}
                    {account.name.charAt(1)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-ios-gray-500">
                    {account.email || account.username}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-ios-gray-500 ml-auto" />
              </div>
            );
          })}
        </IOSFormCard>
      )}
      {!isLoadingAccountCredentials && accountCredentials?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-sm text-ios-gray-500">No accounts found</p>
        </div>
      )}
      {isLoadingAccountCredentials && (
        <div className="w-full h-30 bg-ios-gray-200 dark:bg-ios-gray-900 rounded-lg animate-pulse" />
      )}
      <CreateAccountButton removeNavbarPadding />
    </div>
  );
};

export default AccountListPage;
