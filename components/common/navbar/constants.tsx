import { HomeIcon, ShieldCheck, UserIcon } from "lucide-react";

export const NAVBAR_MENU_ITEMS = [
  {
    label: "Home",
    href: "/home",
    icon: <HomeIcon />,
  },
  {
    label: "Manage Vault",
    href: "/manage-vault",
    icon: <ShieldCheck />,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <UserIcon />,
  },
];
