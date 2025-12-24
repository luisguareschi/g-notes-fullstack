import { Landmark, FileTextIcon, KeyRound, Lock } from "lucide-react";
import { AccountMenuCard } from "./account-menu-card";
import { useGetAccountCredentials } from "@/orval/generated/account-credentials/account-credentials";
import { useLocalSettings } from "@/hooks/use-local-settings";
import { GetAccountCredentialsType } from "@/orval/generated/openAPI.schemas";

export const AccountMenuCardGroup = () => {
  const selectedVaultId = useLocalSettings((state) => state.selectedVaultId);
  const { data: allAccounts } = useGetAccountCredentials(
    {
      vaultId: selectedVaultId ?? undefined,
    },
    {
      query: {
        enabled: !!selectedVaultId,
      },
    },
  );
  const { data: allPasswords } = useGetAccountCredentials(
    {
      vaultId: selectedVaultId ?? undefined,
      type: GetAccountCredentialsType.account,
    },
    {
      query: {
        enabled: !!selectedVaultId,
      },
    },
  );
  const { data: allBankAccounts } = useGetAccountCredentials(
    {
      vaultId: selectedVaultId ?? undefined,
      type: GetAccountCredentialsType.bankAccount,
    },
    {
      query: {
        enabled: !!selectedVaultId,
      },
    },
  );

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <AccountMenuCard
        title="All"
        count={String(allAccounts?.length ?? 0)}
        Icon={KeyRound}
        onClick={() => {}}
        color="blue"
      />
      <AccountMenuCard
        title="Passwords"
        count={String(allPasswords?.length ?? 0)}
        Icon={Lock}
        onClick={() => {}}
        color="green"
      />
      <AccountMenuCard
        title="Bank accounts"
        count={String(allBankAccounts?.length ?? 0)}
        Icon={Landmark}
        onClick={() => {}}
        color="yellow"
      />
      <AccountMenuCard
        title="Notes"
        count="3"
        Icon={FileTextIcon}
        onClick={() => {}}
        color="red"
      />
    </div>
  );
};
