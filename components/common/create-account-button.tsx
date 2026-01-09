import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { IOSInput } from "./ios-form/ios-input";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

interface CreateAccountButtonProps {
  className?: string;
  removeNavbarPadding?: boolean;
}

export const CreateAccountButton = ({
  className,
  removeNavbarPadding = false,
}: CreateAccountButtonProps) => {
  const [open, setOpen] = useState(false);
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
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(CreateAccountCredentialsBody),
    defaultValues: {
      vaultId: selectedVaultId ?? "",
    },
  });

  const onSubmit = (data: z.infer<typeof CreateAccountCredentialsBody>) => {
    createAccountCredentials({
      data: { ...data, vaultId: selectedVaultId ?? "" },
    });
  };

  const onClose = () => {
    setOpen(false);
    reset();
  };

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
      <Drawer open={open} onClose={onClose}>
        <DrawerContent>
          <DrawerHeader className="px-0">
            <div className="grid grid-cols-3 items-center justify-items-center">
              <Button variant="text" onClick={onClose}>
                Cancel
              </Button>
              <DrawerTitle>Add Account</DrawerTitle>
              <Button
                variant="text"
                onClick={handleSubmit(onSubmit)}
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
          <div className="flex flex-col gap-4 pb-10 px-4 h-[70vh] overflow-y-auto">
            <label className="text-base font-medium text-ios-gray-900 dark:text-ios-gray-50">
              Account Name
            </label>
            <IOSInput
              label="Name"
              placeholder="Family, friends, etc."
              inputProps={{ ...register("name") }}
            />
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
              <IOSInput
                label="Notes"
                placeholder="Optional"
                hideCard
                inputProps={{ ...register("notes") }}
              />
            </IOSFormCard>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
