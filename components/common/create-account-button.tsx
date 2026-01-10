import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { IOSInput } from "./ios-form/ios-input";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { CreateAccountCredentialsBody } from "@/schemas/account-credentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "../ui/spinner";
import { useLocalSettings } from "@/hooks/use-local-settings";
import { z } from "zod";
import { usePostAccountCredentials } from "@/orval/generated/account-credentials/account-credentials";
import toast from "react-hot-toast";
import { parsePrismaError } from "@/lib/parse-prisma-error";
import { IOSFormCard } from "./ios-form/ios-form-card";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/queries/queryKeys";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { ListInput, ListItemValue } from "./list-input";

interface CreateAccountButtonProps {
  className?: string;
  removeNavbarPadding?: boolean;
}

export const CreateAccountButton = ({
  className,
  removeNavbarPadding = false,
}: CreateAccountButtonProps) => {
  const [open, setOpen] = useState(false);
  const [showBankAccountForm, setShowBankAccountForm] = useState(false);
  const [owners, setOwners] = useState<ListItemValue[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<ListItemValue[]>([]);
  const selectedVaultId = useLocalSettings((state) => state.selectedVaultId);
  const queryClient = useQueryClient();
  const {
    mutate: createAccountCredentials,
    isPending: isCreatingAccountCredentials,
  } = usePostAccountCredentials({
    mutation: {
      onSuccess: () => {
        toast.success("Account credentials created successfully");
        onClose();
      },
      onError(error) {
        toast.error(
          parsePrismaError(error, "Failed to create account credentials"),
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.accountCredentialsList],
        });
      },
    },
  });
  const { register, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(CreateAccountCredentialsBody),
    defaultValues: {
      vaultId: selectedVaultId ?? "",
    },
    mode: "all",
  });

  const onSubmit = (data: z.infer<typeof CreateAccountCredentialsBody>) => {
    createAccountCredentials({
      data: { ...data, vaultId: selectedVaultId ?? "" },
    });
  };

  const onSubmitError = (
    errors: FieldErrors<z.infer<typeof CreateAccountCredentialsBody>>,
  ) => {
    Object.values(errors).forEach((error) => {
      toast.error(error?.message ?? "An error occurred");
    });
  };

  const onClose = () => {
    setOpen(false);
    reset();
    setShowBankAccountForm(false);
    setOwners([]);
    setBeneficiaries([]);
  };

  // Sync form values with local state
  useEffect(() => {
    setValue(
      "bankAccount.owners",
      owners.map((item) => item.value),
    );
    setValue(
      "bankAccount.beneficiaries",
      beneficiaries.map((item) => item.value),
    );
  }, [beneficiaries, owners, setValue]);

  // Reset bank account form values when bank account form is closed
  useEffect(() => {
    if (!showBankAccountForm) {
      setOwners([]);
      setBeneficiaries([]);
      reset({
        bankAccount: {
          aba: undefined,
          accountNumber: undefined,
          bankAddress: undefined,
          bankName: undefined,
          beneficiaries: [],
          owners: [],
          swift: undefined,
          beneficiaryAddress: undefined,
        },
      });
    }
  }, [showBankAccountForm, reset]);

  return (
    <>
      <Button
        size="iconLarge"
        variant="iOSPrimary"
        className={cn(
          "rounded-full fixed bottom-28 right-6 size-14",
          removeNavbarPadding && "bottom-12",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="min-w-8 min-h-8" />
      </Button>
      <Drawer open={open} onClose={onClose} dismissible>
        <DrawerContent>
          <DrawerHeader className="px-0">
            <div className="grid grid-cols-3 items-center justify-items-center">
              <Button variant="text" onClick={onClose}>
                Cancel
              </Button>
              <DrawerTitle>Add Account</DrawerTitle>
              <Button
                variant="text"
                onClick={handleSubmit(onSubmit, onSubmitError)}
                disabled={isCreatingAccountCredentials}
              >
                {isCreatingAccountCredentials ? (
                  <Spinner className="w-4 h-4" />
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </DrawerHeader>
          <div className="flex flex-col gap-4 pb-10 px-4 overflow-y-scroll h-[calc(100vh-180px)]">
            <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
              Account Name
            </label>
            <IOSFormCard>
              <IOSInput
                label="Name"
                placeholder="Family, friends, etc."
                hideCard
                inputProps={{ ...register("name") }}
              />
              <div className="flex items-center gap-2">
                <label className="text-base">Bank Account</label>
                <Switch
                  className="ml-auto"
                  checked={showBankAccountForm}
                  onCheckedChange={setShowBankAccountForm}
                />
              </div>
            </IOSFormCard>
            <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
              General Details
            </label>
            <IOSFormCard>
              <IOSInput
                label="Email"
                placeholder="example@gmail.com"
                hideCard
                inputProps={{ ...register("email"), type: "email" }}
              />
              <IOSInput
                label="Username"
                placeholder="john_doe"
                hideCard
                inputProps={{ ...register("username") }}
              />
              <IOSInput
                label="Password"
                placeholder="********"
                hideCard
                inputProps={{ ...register("password") }}
              />
            </IOSFormCard>
            {showBankAccountForm && (
              <>
                <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
                  Bank Account Details
                </label>
                <IOSFormCard>
                  <IOSInput
                    label="Bank Name"
                    placeholder="Bank Name"
                    hideCard
                    inputProps={{ ...register("bankAccount.bankName") }}
                  />
                  <IOSInput
                    label="Account N"
                    placeholder="Account Number"
                    hideCard
                    inputProps={{ ...register("bankAccount.accountNumber") }}
                  />
                  <IOSInput
                    label="ABA"
                    placeholder="ABA"
                    hideCard
                    inputProps={{ ...register("bankAccount.aba") }}
                  />
                  <IOSInput
                    label="SWIFT"
                    placeholder="SWIFT"
                    hideCard
                    inputProps={{ ...register("bankAccount.swift") }}
                  />
                </IOSFormCard>
                <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
                  Owners
                </label>
                <ListInput
                  value={owners}
                  onChange={(value) => setOwners(value)}
                />
                <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
                  Beneficiaries
                </label>
                <ListInput
                  value={beneficiaries}
                  onChange={(value) => setBeneficiaries(value)}
                />
                <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
                  Bank Address
                </label>
                <Textarea
                  placeholder="1111 Main St, Anytown, USA"
                  {...register("bankAccount.bankAddress")}
                />
                <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
                  Beneficiary Address
                </label>
                <Textarea
                  placeholder="1111 Main St, Anytown, USA"
                  {...register("bankAccount.beneficiaryAddress")}
                />
              </>
            )}
            <label className="text-base font-normal text-ios-gray-900 dark:text-ios-gray-50">
              Notes
            </label>
            <Textarea placeholder="Optional" {...register("notes")} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
