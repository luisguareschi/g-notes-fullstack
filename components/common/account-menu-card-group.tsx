import { Landmark, FileTextIcon, KeyRound, Lock } from "lucide-react";
import { AccountMenuCard } from "./account-menu-card";
import { useGetAccountCredentials } from "@/orval/generated/account-credentials/account-credentials";
import { useLocalSettings } from "@/hooks/use-local-settings";
import { GetAccountCredentialsType } from "@/orval/generated/openAPI.schemas";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/queries/queryKeys";

export const AccountMenuCardGroup = () => {
  const router = useRouter();
  const selectedVaultId = useLocalSettings((state) => state.selectedVaultId);
  const { data: allAccounts, isLoading: isLoadingAllAccounts } =
    useGetAccountCredentials(
      {
        vaultId: selectedVaultId ?? undefined,
      },
      {
        query: {
          queryKey: [QUERY_KEYS.accountCredentialsList, selectedVaultId],
          enabled: !!selectedVaultId,
        },
      },
    );
  const { data: allPasswords, isLoading: isLoadingAllPasswords } =
    useGetAccountCredentials(
      {
        vaultId: selectedVaultId ?? undefined,
        type: GetAccountCredentialsType.account,
      },
      {
        query: {
          queryKey: [
            QUERY_KEYS.accountCredentialsList,
            selectedVaultId,
            GetAccountCredentialsType.account,
          ],
          enabled: !!selectedVaultId,
        },
      },
    );
  const { data: allBankAccounts, isLoading: isLoadingAllBankAccounts } =
    useGetAccountCredentials(
      {
        vaultId: selectedVaultId ?? undefined,
        type: GetAccountCredentialsType.bankAccount,
      },
      {
        query: {
          queryKey: [
            QUERY_KEYS.accountCredentialsList,
            selectedVaultId,
            GetAccountCredentialsType.bankAccount,
          ],
          enabled: !!selectedVaultId,
        },
      },
    );

  const isLoading =
    isLoadingAllAccounts || isLoadingAllPasswords || isLoadingAllBankAccounts;

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <AccountMenuCard
        title="All"
        count={String(allAccounts?.length ?? 0)}
        Icon={KeyRound}
        onClick={() => {
          router.push("/account-list");
        }}
        color="blue"
        isLoading={isLoading}
      />
      <AccountMenuCard
        title="Passwords"
        count={String(allPasswords?.length ?? 0)}
        Icon={Lock}
        onClick={() => {
          router.push(
            `/account-list?type=${GetAccountCredentialsType.account}`,
          );
        }}
        color="green"
        isLoading={isLoading}
      />
      <AccountMenuCard
        title="Bank accounts"
        count={String(allBankAccounts?.length ?? 0)}
        Icon={Landmark}
        onClick={() => {
          router.push(
            `/account-list?type=${GetAccountCredentialsType.bankAccount}`,
          );
        }}
        color="yellow"
        isLoading={isLoading}
      />
      <AccountMenuCard
        title="Notes"
        count="3"
        Icon={FileTextIcon}
        onClick={() => {}}
        color="red"
        isLoading={isLoading}
      />
    </div>
  );
};
