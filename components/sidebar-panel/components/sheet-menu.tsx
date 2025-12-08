import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/sidebar-panel/components/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarLayoutProps } from "./types";

export function SheetMenu({ config }: { config: SidebarLayoutProps }) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="sm:w-72 px-3 h-full flex flex-col dark:border-zinc-800"
        side="left"
      >
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href={config.header.href} className="flex items-center gap-2">
              {config.header.icon}
              <SheetTitle className="font-bold text-lg">
                {config.header.title}
              </SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen menuList={config.menuList} onSignOut={config.onSignOut} />
      </SheetContent>
    </Sheet>
  );
}
