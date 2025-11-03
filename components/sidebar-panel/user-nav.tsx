"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarLayoutProps } from "./types";

export function UserNav({ config }: { config: SidebarLayoutProps }) {
  const getUserInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("");
  };
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">
                    {getUserInitials(config.user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {config.user.name}
            </p>
            <p className="text-xs leading-none text-zinc-500 dark:text-zinc-400">
              {config.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        {config.user.menuItems.length > 0 && <DropdownMenuSeparator />}
        <DropdownMenuGroup>
          {config.user.menuItems.map((item) => (
            <DropdownMenuItem
              className="hover:cursor-pointer"
              asChild
              key={item.href}
            >
              <Link href={item.href} className="flex items-center">
                <item.icon className="w-4 h-4 mr-3 text-zinc-500 dark:text-zinc-400" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={config.onSignOut}
        >
          <LogOut className="w-4 h-4 mr-3 text-zinc-500 dark:text-zinc-400" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
