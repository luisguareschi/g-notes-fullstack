"use client";
import { BackButton } from "@/components/common/back-button";
import FullScreenLoading from "@/components/common/full-screen-loading";
import { IOSFormCard } from "@/components/common/ios-form/ios-form-card";
import { IOSInput } from "@/components/common/ios-form/ios-input";
import { ListInput } from "@/components/common/list-input";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteAccountCredentialsId,
  useGetAccountCredentialsId,
} from "@/orval/generated/account-credentials/account-credentials";
import { QUERY_KEYS } from "@/queries/queryKeys";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const AccountDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: accountCredentials, isLoading: isLoadingAccountCredentials } =
    useGetAccountCredentialsId(id, {
      query: {
        queryKey: [QUERY_KEYS.accountCredentialsDetails, id],
        enabled: !!id,
      },
    });

  const { mutate: deleteAccountCredentials } = useDeleteAccountCredentialsId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.accountCredentialsList],
        });
        toast.success("Account credentials deleted successfully");
        router.replace("/account-list");
      },
      onError: () => {
        toast.error("Failed to delete account credentials");
      },
    },
  });

  const isBankAccount = accountCredentials?.bankAccount !== null;

  if (isLoadingAccountCredentials) {
    return <FullScreenLoading />;
  }

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      deleteAccountCredentials({ id });
    }
  };

  return (
    <div className="flex flex-col justify-start min-h-svh p-4 gap-4 pb-12">
      <section className="flex w-full items-center">
        <BackButton />
        <ModeToggle className="ml-auto" />
      </section>
      <h1 className="text-3xl font-bold">{accountCredentials?.name}</h1>
      <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
        General Details
      </label>
      <IOSFormCard>
        <IOSInput
          label="Email"
          value={accountCredentials?.email}
          hideCard
          inputProps={{ readOnly: true }}
        />
        <IOSInput
          label="Username"
          value={accountCredentials?.username}
          hideCard
          inputProps={{ readOnly: true }}
        />
        <IOSInput
          label="Password"
          value={accountCredentials?.password}
          hideCard
          inputProps={{ readOnly: true }}
        />
      </IOSFormCard>
      {isBankAccount && (
        <>
          <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
            Bank Account Details
          </label>
          <IOSFormCard>
            <IOSInput
              label="Bank Name"
              placeholder="Bank Name"
              hideCard
              value={accountCredentials?.bankAccount?.bankName}
              inputProps={{ readOnly: true }}
            />
            <IOSInput
              label="Account N"
              placeholder="Account Number"
              hideCard
              value={accountCredentials?.bankAccount?.accountNumber}
              inputProps={{ readOnly: true }}
            />
            <IOSInput
              label="ABA"
              placeholder="ABA"
              hideCard
              value={accountCredentials?.bankAccount?.aba}
              inputProps={{ readOnly: true }}
            />
            <IOSInput
              label="SWIFT"
              placeholder="SWIFT"
              hideCard
              value={accountCredentials?.bankAccount?.swift}
              inputProps={{ readOnly: true }}
            />
          </IOSFormCard>
          <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
            Owners
          </label>
          <ListInput
            value={accountCredentials?.bankAccount?.owners.map((owner) => ({
              value: owner,
              id: owner,
            }))}
            readonly
          />
          <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
            Beneficiaries
          </label>
          <ListInput
            value={accountCredentials?.bankAccount?.beneficiaries.map(
              (beneficiary) => ({
                value: beneficiary,
                id: beneficiary,
              }),
            )}
            readonly
          />
          <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
            Bank Address
          </label>
          <Textarea
            placeholder="1111 Main St, Anytown, USA"
            value={accountCredentials?.bankAccount?.bankAddress ?? ""}
            readOnly
          />
          <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
            Beneficiary Address
          </label>
          <Textarea
            placeholder="1111 Main St, Anytown, USA"
            value={accountCredentials?.bankAccount?.beneficiaryAddress ?? ""}
            readOnly
          />
        </>
      )}
      <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
        Notes
      </label>
      <Textarea
        placeholder="Notes"
        value={accountCredentials?.notes ?? ""}
        readOnly
      />
      <div className="mt-4 flex justify-center">
        <Button
          variant="textDestructive"
          className="w-fit"
          size="sm"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default AccountDetailsPage;
