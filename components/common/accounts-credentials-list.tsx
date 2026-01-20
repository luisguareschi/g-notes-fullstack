import { GetAccountCredentialsResponseItem } from "@/orval/generated/openAPI.schemas";
import { IOSFormCard } from "./ios-form/ios-form-card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ChevronRight } from "lucide-react";
import SwipeToDelete from "react-swipe-to-delete-ios";

interface AccountsCredentialsListProps {
  accountCredentials?: GetAccountCredentialsResponseItem[];
  isLoading?: boolean;
  handleAccountClick?: (accountId: string) => void;
  handleDeleteAccount?: (accountId: string) => void;
}

export const AccountsCredentialsList = ({
  accountCredentials,
  isLoading,
  handleAccountClick,
  handleDeleteAccount,
}: AccountsCredentialsListProps) => {
  return (
    <div>
      {!!accountCredentials?.length && !isLoading && (
        <IOSFormCard fullWidthSeparator className="mb-30">
          {accountCredentials?.map((account) => {
            return (
              <SwipeToDelete
                key={account.id}
                onDelete={() => handleDeleteAccount?.(account.id)}
                height={40}
                disabled={isLoading || !handleDeleteAccount}
                onDeleteConfirm={(
                  onSuccess: () => void,
                  onCancel: () => void,
                ) => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this account?",
                    )
                  ) {
                    onSuccess();
                  } else {
                    onCancel();
                  }
                }}
              >
                <div
                  key={account.id}
                  className="flex items-center gap-2 cursor-pointer bg-white dark:bg-ios-gray-950"
                  onClick={() => handleAccountClick?.(account.id)}
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
              </SwipeToDelete>
            );
          })}
        </IOSFormCard>
      )}
      {!isLoading && accountCredentials?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-sm text-ios-gray-500">No accounts found</p>
        </div>
      )}
      {isLoading && (
        <div className="w-full h-30 bg-ios-gray-200 dark:bg-ios-gray-900 rounded-lg animate-pulse" />
      )}
    </div>
  );
};
