import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface IOSFormCardProps {
  children: React.ReactNode[];
}

export const IOSFormCard = ({ children }: IOSFormCardProps) => {
  return (
    <Card className="py-3 flex gap-2 pl-3 flex-col overflow-hidden">
      {children.map((child, index) => (
        <>
          {child}
          {index !== children.length - 1 && (
            <Separator className={cn(`ml-22`)} />
          )}
        </>
      ))}
    </Card>
  );
};
