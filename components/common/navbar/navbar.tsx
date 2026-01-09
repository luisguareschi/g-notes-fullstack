import Link from "next/link";
import { NAVBAR_MENU_ITEMS } from "./constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export const Navbar = () => {
  const pathname = usePathname();

  const isSelected = (href: string) => {
    return href.startsWith(pathname);
  };

  const shouldShowNavbar = useMemo(() => {
    return NAVBAR_MENU_ITEMS.some((item) => item.href.startsWith(pathname));
  }, [pathname]);

  if (!shouldShowNavbar) {
    return null;
  }

  return (
    <nav
      className="absolute bottom-0 left-0 w-full bg-white shadow-xs 
    dark:bg-ios-gray-950 grid grid-cols-3 place-items-center gap-4 py-4 pb-6"
    >
      {NAVBAR_MENU_ITEMS.map((item) => (
        <Link href={item.href} key={item.href}>
          <div
            className={cn(
              "flex flex-col items-center justify-center text-ios-gray-500 text-sm gap-1",
              isSelected(item.href) && "text-blue-500",
            )}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
};
