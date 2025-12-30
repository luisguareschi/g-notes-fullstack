import { useState } from "react";
import { CreateVaultForm } from "./create-vault-form";
import { useGetVaults } from "@/orval/generated/vaults/vaults";
import { useLocalSettings } from "@/hooks/use-local-settings";
import { QUERY_KEYS } from "@/queries/queryKeys";
import { JoinVaultForm } from "./join-vault-form";

enum VaultActions {
  JOIN_VAULT = "join_vault",
  CREATE_VAULT = "create_vault",
}

export const SelectVaultButton = () => {
  const { data: vaults, isLoading: isLoadingVaults } = useGetVaults({
    query: {
      queryKey: [QUERY_KEYS.vaultsList],
    },
  });
  const selectedVaultId = useLocalSettings((state) => state.selectedVaultId);
  const setSelectedVaultId = useLocalSettings(
    (state) => state.setSelectedVaultId,
  );
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
        <optgroup label="Actions">
          <option value={VaultActions.JOIN_VAULT}>Join vault</option>
          <option value={VaultActions.CREATE_VAULT}>Create vault</option>
        </optgroup>
      </select>
      <CreateVaultForm
        open={selectedAction === VaultActions.CREATE_VAULT}
        onClose={() => setSelectedAction(null)}
      />
      <JoinVaultForm
        open={selectedAction === VaultActions.JOIN_VAULT}
        onClose={() => setSelectedAction(null)}
      />
    </>
  );
};
