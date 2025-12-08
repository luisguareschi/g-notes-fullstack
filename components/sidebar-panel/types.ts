import { LucideIcon } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export interface SidebarLayoutProps {
  header: {
    title: string;
    icon?: React.ReactNode;
    href: string;
  };
  menuList: Group[];
  onSignOut: () => void;
  user: {
    name: string;
    email: string;
    menuItems: {
      icon: LucideIcon;
      label: string;
      href: string;
    }[];
  };
}
