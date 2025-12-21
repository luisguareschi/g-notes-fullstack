import { useState } from "react";
import { CreateVaultForm } from "./create-vault-form";
import { useGetVaults } from "@/orval/generated/vaults/vaults";
import { useLocalSettings } from "@/hooks/use-local-settings";

enum VaultActions {
  JOIN_VAULT = "join_vault",
  CREATE_VAULT = "create_vault",
}

export const SelectOrganizationButton = () => {
  const { data: vaults, isLoading: isLoadingVaults } = useGetVaults();
  const { selectedVaultId, setSelectedVaultId } = useLocalSettings();
  const [selectedAction, setSelectedAction] = useState<VaultActions | null>(
    null,
  );

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === VaultActions.JOIN_VAULT) {
      setSelectedAction(VaultActions.JOIN_VAULT);
      return;
    }
    if (value === VaultActions.CREATE_VAULT) {
      setSelectedAction(VaultActions.CREATE_VAULT);
      return;
    }

    setSelectedVaultId(value);
  };

  return (
    <>
      <select
        className="text-blue-500 font-medium text-lg appearance-none active:outline-none focus:outline-none"
        onChange={handleSelectOption}
        value={selectedVaultId ?? undefined}
      >
        {isLoadingVaults && <option>...</option>}
        {vaults?.map((vault) => (
          <option key={vault.id} value={vault.id}>
            {vault.name}
          </option>
        ))}
        <option value={VaultActions.JOIN_VAULT}>Join vault</option>
        <option value={VaultActions.CREATE_VAULT}>Create vault</option>
      </select>
      <CreateVaultForm
        open={selectedAction === VaultActions.CREATE_VAULT}
        onClose={() => setSelectedAction(null)}
      />
    </>
  );
};
