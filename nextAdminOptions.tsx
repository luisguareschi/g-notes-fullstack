import type { NextAdminOptions } from "@premieroctet/next-admin";
import { ShieldCheck } from "lucide-react";

// Check https://heroicons.com/ for icon names

const options: NextAdminOptions = {
  title: (
    <div className="flex items-center justify-center gap-4 px-4 text-slate-600">
      <ShieldCheck className="min-w-5 min-h-5" />
      <p className="font-bold">BaseApp Admin</p>
    </div>
  ),
  forceColorScheme: "light",
  pages: {
    "/prisma-studio": {
      title: "Database",
      icon: "CircleStackIcon",
    },
  },
  externalLinks: [
    {
      label: "API Documentation",
      url: "/api/docs",
    },
  ],
  model: {
    User: {
      icon: "UsersIcon",
      title: "Users",
      toString(item) {
        return item.email;
      },
    },
  },
};

export default options;
