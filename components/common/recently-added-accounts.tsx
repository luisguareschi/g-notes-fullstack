import { ClockIcon } from "lucide-react";

export const RecentlyAddedAccounts = () => {
  return (
    <div>
      <h1 className="flex items-center gap-2 text-md font-semibold uppercase text-ios-gray-600">
        <ClockIcon size={18} />
        Recently Added
      </h1>
    </div>
  );
};
