import { z } from "zod";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { IOSInput } from "./ios-form/ios-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostVaults } from "@/orval/generated/vaults/vaults";
import toast from "react-hot-toast";
import { useLocalSettings } from "@/hooks/use-local-settings";
import { parsePrismaError } from "@/lib/parse-prisma-error";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/queries/queryKeys";
import { Spinner } from "../ui/spinner";

const formSchema = z.object({
  name: z.string(),
});

interface CreateVaultFormProps {
  open: boolean;
  onClose: () => void;
}

export const CreateVaultForm = ({ open, onClose }: CreateVaultFormProps) => {
  const queryClient = useQueryClient();
  const setSelectedVaultId = useLocalSettings(
    (state) => state.setSelectedVaultId,
  );
  const { mutate: createVault, isPending: isCreatingVault } = usePostVaults({
    mutation: {
      onSuccess: async (data) => {
        toast.success("Vault created successfully");
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.vaultsList],
        });
        setSelectedVaultId(data.id);
        onClose();
      },
      onError(error) {
        toast.error(parsePrismaError(error, "Failed to create vault"));
      },
    },
  });
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createVault({ data: { name: data.name } });
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader className="px-0">
          <div className="flex items-center justify-between">
            <Button variant="text" onClick={onClose}>
              Cancel
            </Button>
            <DrawerTitle>Create Vault</DrawerTitle>
            <Button
              variant="text"
              onClick={handleSubmit(onSubmit)}
              disabled={isCreatingVault}
            >
              {isCreatingVault ? <Spinner className="w-4 h-4" /> : "Create"}
            </Button>
          </div>
        </DrawerHeader>
        <div className="flex flex-col gap-4 pb-10 px-4 h-[70vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-ios-gray-900 dark:text-ios-gray-50">
              Create a new vault
            </h2>
            <p className="text-base text-ios-gray-600 dark:text-ios-gray-300">
              A vault is a private space where you can store your data. Later,
              you can invite other users to join your vault.
            </p>
          </div>
          <IOSInput
            label="Name"
            placeholder="Family, friends, etc."
            inputProps={{ ...register("name") }}
          />
          <p className="text-sm text-ios-gray-600 dark:text-ios-gray-300 mt-2">
            Information will be encrypted so only you and vault members can
            access it.
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
