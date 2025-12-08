import { MainLayout } from "@premieroctet/next-admin";
import { NextAdminRouterAdapter } from "@premieroctet/next-admin/adapters/next";
import { getMainLayoutProps } from "@premieroctet/next-admin/appRouter";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import options from "../../../nextAdminOptions";
import "../../../nextAdminCss.css";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const mainLayoutProps = await getMainLayoutProps({
    basePath: "/admin",
    apiBasePath: "/api/admin",
    options,
  });

  return (
    <NextAdminRouterAdapter>
      <MainLayout
        {...mainLayoutProps}
        user={{
          data: {
            name: session?.user?.email || "Admin",
          },
        }}
      >
        {children}
      </MainLayout>
    </NextAdminRouterAdapter>
  );
};

export default Layout;
