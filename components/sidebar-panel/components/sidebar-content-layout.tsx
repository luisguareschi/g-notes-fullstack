import { Navbar } from "@/components/sidebar-panel/components/navbar";
import { SidebarLayoutProps } from "./types";

interface SidebarContentLayoutProps {
  title: string;
  children: React.ReactNode;
  config: SidebarLayoutProps;
}

export function SidebarContentLayout({
  title,
  children,
  config,
}: SidebarContentLayoutProps) {
  return (
    <div className="h-full">
      <Navbar title={title} config={config} />
      <div className="pt-8 pb-8 px-4 sm:px-8 h-[calc(100vh-58px)]">
        {children}
      </div>
    </div>
  );
}
