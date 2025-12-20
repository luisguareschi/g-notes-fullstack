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
        <div className="flex flex-col gap-4 pb-10 px-4">
          <IOSInput label="Name" placeholder="Family, friends, etc." />
          <h1>Members</h1>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
