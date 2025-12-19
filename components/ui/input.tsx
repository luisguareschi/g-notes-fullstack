import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-ios-gray-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-ios-gray-950 placeholder:text-ios-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-gray-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-ios-gray-800 dark:bg-ios-gray-950 dark:ring-offset-ios-gray-950 dark:file:text-ios-gray-50 dark:placeholder:text-ios-gray-400 dark:focus-visible:ring-ios-gray-300 transition-all",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
