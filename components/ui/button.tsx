import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-ios-gray-950 dark:focus-visible:ring-ios-gray-300",
  {
    variants: {
      variant: {
        default:
          "bg-ios-gray-900 text-ios-gray-50 hover:bg-ios-gray-900/90 dark:bg-ios-gray-50 dark:text-ios-gray-900 dark:hover:bg-ios-gray-50/90",
        destructive:
          "bg-red-500 text-ios-gray-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-ios-gray-50 dark:hover:bg-red-900/90",
        outline:
          "border border-ios-gray-200 bg-white hover:bg-ios-gray-100 hover:text-ios-gray-900 dark:border-ios-gray-800 dark:bg-ios-gray-950 dark:hover:bg-ios-gray-800 dark:hover:text-ios-gray-50",
        secondary:
          "bg-ios-gray-100 text-ios-gray-900 hover:bg-ios-gray-100/80 dark:bg-ios-gray-800 dark:text-ios-gray-50 dark:hover:bg-ios-gray-800/80",
        ghost:
          "hover:bg-ios-gray-100 hover:text-ios-gray-900 dark:hover:bg-ios-gray-800 dark:hover:text-ios-gray-50",
        link: "text-ios-gray-900 underline-offset-4 hover:underline dark:text-ios-gray-50",
        iOSPrimary:
          "bg-blue-500 text-white hover:bg-ios-gray-900/90 rounded-lg",
        text: "text-blue-500 dark:text-blue-500 hover:text-blue-500/80 bg-transparent",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        iconLarge: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "iOSPrimary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
