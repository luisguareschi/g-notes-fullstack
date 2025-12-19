"use client";

import { Sidebar } from "@/components/sidebar-panel/components/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { SidebarLayoutProps } from "./types";

export function SidebarLayout({
  config,
  children,
}: {
  config: SidebarLayoutProps;
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;
  return (
    <>
      <Sidebar config={config} />
      <main
        className={cn(
          "min-h-screen bg-ios-gray-50 dark:bg-ios-gray-900 transition-[margin-left] ease-in-out duration-300",
          !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72"),
        )}
      >
        {children}
      </main>
    </>
  );
}
