"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { AdminLoginForm } from "@/components/common/admin-login-form";
import { SidebarLayout } from "@/components/sidebar-panel/sidebar-layout";
import { SidebarContentLayout } from "@/components/sidebar-panel/sidebar-content-layout";
import { SidebarLayoutProps } from "@/components/sidebar-panel/types";
import { Component, Database, LayoutGrid, Users } from "lucide-react";

const baseSidebarConfig: Pick<SidebarLayoutProps, "header" | "menuList"> = {
  header: {
    title: "BaseApp Admin",
    href: "/admin",
    icon: <Component className="min-w-5 min-h-5 mr-2" />,
  },
  menuList: [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/admin/prisma-studio",
          label: "Database",
          icon: Database,
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/admin/users",
          label: "Users",
          icon: Users,
        },
      ],
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  const sidebarConfig: SidebarLayoutProps = {
    ...baseSidebarConfig,
    onSignOut: () => {
      signOut();
    },
    user: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      menuItems: [],
    },
  };

  if (!isPending && !session) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <AdminLoginForm />
        </div>
      </div>
    );
  }

  return (
    <SidebarLayout config={sidebarConfig}>
      <SidebarContentLayout title="Admin Panel" config={sidebarConfig}>
        {children}
      </SidebarContentLayout>
    </SidebarLayout>
  );
}
