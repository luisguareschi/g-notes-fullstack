import { z } from "zod";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { IOSInput } from "./ios-form/ios-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostVaultsJoin } from "@/orval/generated/vaults/vaults";
import toast from "react-hot-toast";
import { useLocalSettings } from "@/hooks/use-local-settings";
import { parsePrismaError } from "@/lib/parse-prisma-error";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/queries/queryKeys";
import { Spinner } from "../ui/spinner";

const formSchema = z.object({
  vaultKey: z.string().describe("Vault Key"),
});

interface JoinVaultFormProps {
  open: boolean;
  onClose: () => void;
}

export const JoinVaultForm = ({ open, onClose }: JoinVaultFormProps) => {
  const queryClient = useQueryClient();
  const setSelectedVaultId = useLocalSettings(
    (state) => state.setSelectedVaultId,
  );
  const { mutate: joinVault, isPending: isJoiningVault } = usePostVaultsJoin({
    mutation: {
      onSuccess: async (data) => {
        toast.success("Vault joined successfully");
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.vaultsList],
        });
        setSelectedVaultId(data.id);
        onClose();
      },
      onError(error) {
        toast.error(parsePrismaError(error, "Failed to join vault"));
      },
    },
  });
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vaultKey: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    joinVault({ data: { vaultKey: data.vaultKey } });
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader className="px-0">
          <div className="grid grid-cols-3 items-center justify-items-center">
            <Button variant="text" onClick={onClose}>
              Cancel
            </Button>
            <DrawerTitle>Join Vault</DrawerTitle>
            <Button
              variant="text"
              onClick={handleSubmit(onSubmit)}
              disabled={isJoiningVault}
            >
              {isJoiningVault ? <Spinner className="w-4 h-4" /> : "Join"}
            </Button>
          </div>
        </DrawerHeader>
        <div className="flex flex-col gap-4 pb-10 px-4 h-[70vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-ios-gray-900 dark:text-ios-gray-50">
              Join a vault
            </h2>
            <p className="text-base text-ios-gray-600 dark:text-ios-gray-300">
              Enter the vault key to join a vault.
            </p>
          </div>
          <IOSInput
            label="Vault Key"
            placeholder="Enter the vault key"
            inputProps={{ ...register("vaultKey") }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
