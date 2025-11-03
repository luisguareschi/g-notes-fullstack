import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/sidebar-panel/user-nav";
import { SheetMenu } from "@/components/sidebar-panel/sheet-menu";
import { SidebarLayoutProps } from "./types";

interface NavbarProps {
  title: string;
  config: SidebarLayoutProps;
}

export function Navbar({ title, config }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu config={config} />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          <UserNav config={config} />
        </div>
      </div>
    </header>
  );
}
