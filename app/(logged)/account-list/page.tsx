"use client";
import { BackButton } from "@/components/common/back-button";
import { ModeToggle } from "@/components/mode-toggle";
import { GetAccountCredentialsType } from "@/orval/generated/openAPI.schemas";
import { useSearchParams } from "next/navigation";
import z from "zod";
import { useGetAccountCredentials } from "@/orval/generated/account-credentials/account-credentials";
import { useLocalSettings } from "@/hooks/use-local-settings";
import FullScreenLoading from "@/components/common/full-screen-loading";
import { QUERY_KEYS } from "@/queries/queryKeys";

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
  const searchParams = useSearchParams();
  const { type } = AccountListPageQueryParams.parse(
    Object.fromEntries(searchParams),
  );
  const selectedVaultId = useLocalSettings((state) => state.selectedVaultId);
  const { data: accountCredentials, isLoading: isLoadingAccountCredentials } =
    useGetAccountCredentials(
      {
        vaultId: selectedVaultId ?? undefined,
        type: type ?? undefined,
      },
      {
        query: {
          queryKey: [QUERY_KEYS.vaultsList, selectedVaultId, type],
          enabled: !!selectedVaultId && !!type,
        },
      },
    );

  if (isLoadingAccountCredentials) {
    return <FullScreenLoading />;
  }

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
