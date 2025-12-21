import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { IOSInput } from "./ios-form/ios-input";

interface CreateVaultFormProps {
  open: boolean;
  onClose: () => void;
}

export const CreateVaultForm = ({ open, onClose }: CreateVaultFormProps) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader className="px-0">
          <div className="flex items-center justify-between">
            <Button variant="text" onClick={onClose}>
              Cancel
            </Button>
            <DrawerTitle>Create Vault</DrawerTitle>
            <Button variant="text">Create</Button>
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
          <IOSInput label="Name" placeholder="Family, friends, etc." />
          <p className="text-sm text-ios-gray-600 dark:text-ios-gray-300 mt-2">
            Information will be encrypted so only you and vault members can
            access it.
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
