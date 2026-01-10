import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full border-ios-gray-200 px-3 py-2 text-base ring-offset-white placeholder:text-ios-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ios-gray-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-ios-gray-800 dark:bg-ios-gray-950 dark:ring-offset-ios-gray-950 dark:placeholder:text-ios-gray-400 dark:focus-visible:ring-ios-gray-300 focus:outline-none read-only:text-ios-gray-500 rounded-lg border border-none bg-white text-ios-gray-950 shadow-xs dark:text-ios-gray-50 ",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
