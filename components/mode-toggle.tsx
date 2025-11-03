"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Moon, Sun } from "lucide-react";
import { motion, MotionProps } from "motion/react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const animationProps: MotionProps = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.2 },
  };

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full w-8 h-8 bg-white mr-2 dark:bg-zinc-950"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme !== "dark" && (
              <motion.div {...animationProps}>
                <Sun className="w-4 h-4" />
              </motion.div>
            )}
            {theme === "dark" && (
              <motion.div {...animationProps}>
                <Moon className="w-4 h-4" />
              </motion.div>
            )}
            <span className="sr-only">Switch Theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Switch Theme</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
