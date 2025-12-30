import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

interface IOSFormCardProps {
  children: React.ReactNode;
  fullWidthSeparator?: boolean;
  className?: string;
}

export const IOSFormCard = ({
  children,
  fullWidthSeparator = false,
  className,
}: IOSFormCardProps) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <Card className={cn("py-3 flex gap-2 flex-col overflow-hidden", className)}>
      {childrenArray.map((child, index) => (
        <>
          <div className="w-full px-3">{child}</div>
          {index !== childrenArray.length - 1 && (
            <Separator className={cn(`ml-25`, fullWidthSeparator && "ml-0")} />
          )}
        </>
      ))}
    </Card>
  );
};
