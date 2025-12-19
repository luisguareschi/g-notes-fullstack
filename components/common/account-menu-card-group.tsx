import { Landmark, FileTextIcon, KeyRound, Lock } from "lucide-react";
import { AccountMenuCard } from "./account-menu-card";

export const AccountMenuCardGroup = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <AccountMenuCard
        title="All"
        count="23"
        Icon={KeyRound}
        onClick={() => {}}
        color="blue"
      />
      <AccountMenuCard
        title="Passwords"
        count="10"
        Icon={Lock}
        onClick={() => {}}
        color="green"
      />
      <AccountMenuCard
        title="Bank accounts"
        count="5"
        Icon={Landmark}
        onClick={() => {}}
        color="yellow"
      />
      <AccountMenuCard
        title="Notes"
        count="3"
        Icon={FileTextIcon}
        onClick={() => {}}
        color="red"
      />
    </div>
  );
};
