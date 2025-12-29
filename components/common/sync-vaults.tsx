import { useGetVaults, useGetVaultsId } from "@/orval/generated/vaults/vaults";
import { QUERY_KEYS } from "@/queries/queryKeys";
import { useLocalSettings } from "@/hooks/use-local-settings";
import { useMemo } from "react";
import { Drawer, DrawerContent } from "../ui/drawer";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const SyncVaults = () => {
  const router = useRouter();
  const selectedVaultId = useLocalSettings((state) => state.selectedVaultId);
  const setSelectedVaultId = useLocalSettings(
    (state) => state.setSelectedVaultId,
  );
  const { data: vaults = [], isLoading: isLoadingVaults } = useGetVaults({
    query: {
      queryKey: [QUERY_KEYS.vaultsList],
      refetchInterval: 5000,
    },
  });
  useGetVaultsId(selectedVaultId ?? "", {
    query: {
      queryKey: [QUERY_KEYS.vaultDetails, selectedVaultId],
      refetchInterval: 5000,
      enabled: !!selectedVaultId,
    },
  });

  const isOutOfSync = useMemo(() => {
    return (
      !!selectedVaultId &&
      !vaults.find((vault) => vault.id === selectedVaultId) &&
      !isLoadingVaults
    );
  }, [selectedVaultId, vaults, isLoadingVaults]);

  const handleSyncVaults = () => {
    if (vaults.length > 0) {
      setSelectedVaultId(vaults[0].id);
      router.replace("/home");
    }
  };

  return (
    <Drawer open={isOutOfSync} dismissible={false}>
      <DrawerContent>
        <div className="flex flex-col gap-4 pb-10 px-4 overflow-y-auto pt-10">
          <h2 className="text-lg font-semibold text-ios-gray-900 dark:text-ios-gray-50">
            Vaults are out of sync
          </h2>
          <p className="text-base text-ios-gray-600 dark:text-ios-gray-300">
            It seems you do not have access to the vault you are currently
            selected. Please sync your vaults to continue.
          </p>
          <Button variant="iOSPrimary" onClick={handleSyncVaults}>
            Sync vaults
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
