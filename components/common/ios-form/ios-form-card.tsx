import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface IOSFormCardProps {
  children: React.ReactNode[];
  fullWidthSeparator?: boolean;
}

export const IOSFormCard = ({
  children,
  fullWidthSeparator = false,
}: IOSFormCardProps) => {
  return (
    <Card className="py-3 flex gap-2 flex-col overflow-hidden">
      {children.map((child, index) => (
        <>
          <div className="w-full px-3">{child}</div>
          {index !== children.length - 1 && (
            <Separator className={cn(`ml-25`, fullWidthSeparator && "ml-0")} />
          )}
        </>
      ))}
    </Card>
  );
};
