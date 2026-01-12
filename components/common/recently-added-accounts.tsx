import { useLocalSettings } from "@/hooks/use-local-settings";
import { useGetAccountCredentials } from "@/orval/generated/account-credentials/account-credentials";
import {
  GetAccountCredentialsOrderBy,
  GetAccountCredentialsOrderDirection,
} from "@/orval/generated/openAPI.schemas";
import { ClockIcon } from "lucide-react";
import { AccountsCredentialsList } from "./accounts-credentials-list";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/queries/queryKeys";

const MAX_RECENTLY_ADDED_ACCOUNTS = 5;
const ORDER_BY = GetAccountCredentialsOrderBy.updatedAt;
const ORDER_DIRECTION = GetAccountCredentialsOrderDirection.desc;

export const RecentlyAddedAccounts = () => {
  const selectedVaultId = useLocalSettings((state) => state.selectedVaultId);
  const router = useRouter();
  const {
    data: recentlyAddedAccounts,
    isLoading: isLoadingRecentlyAddedAccounts,
  } = useGetAccountCredentials(
    {
      vaultId: selectedVaultId ?? undefined,
      limit: MAX_RECENTLY_ADDED_ACCOUNTS,
      orderDirection: ORDER_DIRECTION,
      orderBy: ORDER_BY,
    },
    {
      query: {
        queryKey: [
          QUERY_KEYS.accountCredentialsList,
          selectedVaultId,
          MAX_RECENTLY_ADDED_ACCOUNTS,
          ORDER_DIRECTION,
          ORDER_BY,
        ],
        enabled: !!selectedVaultId,
      },
    },
  );

  const handleAccountClick = (accountId: string) => {
    router.push(`/account-list/${accountId}`);
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="flex items-center gap-2 text-md font-semibold uppercase text-ios-gray-600">
        <ClockIcon size={18} />
        Recently updated
      </h1>
      <AccountsCredentialsList
        accountCredentials={recentlyAddedAccounts}
        isLoading={isLoadingRecentlyAddedAccounts}
        handleAccountClick={handleAccountClick}
      />
      {!isLoadingRecentlyAddedAccounts &&
        !recentlyAddedAccounts &&
        !!selectedVaultId && (
          <div className="flex flex-col items-center justify-center mt-10">
            <p className="text-base text-ios-gray-500">
              No recently added accounts
            </p>
          </div>
        )}
    </div>
  );
};
