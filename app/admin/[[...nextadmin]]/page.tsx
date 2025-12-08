import { PageProps } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import { NextAdmin } from "@premieroctet/next-admin/adapters/next";
import PageLoader from "@premieroctet/next-admin/pageLoader";
import prisma from "../../../lib/prisma";
import "../../../nextAdminCss.css";
import options from "../../../nextAdminOptions";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center h-dvh w-full">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>BaseApp Admin</EmptyTitle>
          <EmptyDescription>
            Welcome to the BaseApp Admin panel. Here you can manage the users,
            database, and other content.
          </EmptyDescription>
        </EmptyHeader>
        <Button variant="link" asChild size="sm">
          <a href="/admin/prisma-studio">
            Go to Database <ArrowUpRightIcon />
          </a>
        </Button>
      </Empty>
    </div>
  );
};

export default async function AdminPage(props: PageProps) {
  const params = props.params;
  const searchParams = props.searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const nextAdminProps = await getNextAdminProps({
    params: params.nextadmin,
    searchParams,
    basePath: "/admin",
    apiBasePath: "/api/admin",
    prisma,
    options,
  });

  return (
    <NextAdmin
      pageLoader={<PageLoader />}
      {...nextAdminProps}
      dashboard={<Dashboard />}
      user={{
        data: {
          name: session?.user?.email || "Admin",
        },
        logout: "/admin/logout",
      }}
    />
  );
}
