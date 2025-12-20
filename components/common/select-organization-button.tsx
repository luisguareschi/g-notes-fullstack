import { Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import { CreateVaultForm } from "./create-vault-form";

enum SelectOrganizationOption {
  PERSONAL = "personal",
  JOIN_VAULT = "join_vault",
  CREATE_VAULT = "create_vault",
}

export const SelectOrganizationButton = () => {
  const [selectedOption, setSelectedOption] =
    useState<SelectOrganizationOption>(SelectOrganizationOption.PERSONAL);

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value as SelectOrganizationOption);
  };

  return (
    <>
      <select
        className="text-blue-500 font-medium text-lg appearance-none active:outline-none focus:outline-none"
        onChange={handleSelectOption}
        value={selectedOption}
      >
        <option value={SelectOrganizationOption.PERSONAL}>Personal</option>
        <option value={SelectOrganizationOption.JOIN_VAULT}>
          <PlusCircle className="w-4 h-4" /> Join vault
        </option>
        <option value={SelectOrganizationOption.CREATE_VAULT}>
          <Plus className="w-4 h-4" /> Create vault
        </option>
      </select>
      <CreateVaultForm
        open={selectedOption === SelectOrganizationOption.CREATE_VAULT}
        onClose={() => setSelectedOption(SelectOrganizationOption.PERSONAL)}
      />
    </>
  );
};
