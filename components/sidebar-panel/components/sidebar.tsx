"use client";
import { Menu } from "@/components/sidebar-panel/components/menu";
import { SidebarToggle } from "@/components/sidebar-panel/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SidebarLayoutProps } from "./types";

export function Sidebar({ config }: { config: SidebarLayoutProps }) {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden",
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-hidden border-r border-ios-gray-200 dark:border-ios-gray-800 dark:bg-ios-gray-950"
      >
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !getOpenState() ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <Link href={config.header.href} className="flex items-center gap-2">
            {config.header.icon}
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                !getOpenState()
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100",
              )}
            >
              {config.header.title}
            </h1>
          </Link>
        </Button>
        <Menu
          isOpen={getOpenState()}
          menuList={config.menuList}
          onSignOut={config.onSignOut}
        />
      </div>
    </aside>
  );
}
