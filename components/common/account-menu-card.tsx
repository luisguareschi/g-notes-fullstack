import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { LucideIcon } from "lucide-react";
import { useMemo } from "react";

interface AccountMenuCardProps {
  title: string;
  count: string;
  Icon: LucideIcon;
  onClick: () => void;
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "orange";
  isLoading?: boolean;
}

export const AccountMenuCard = ({
  title,
  count,
  Icon,
  onClick,
  color = "blue",
  isLoading = false,
}: AccountMenuCardProps) => {
  const buttonColor = useMemo(() => {
    switch (color) {
      case "blue":
        return "bg-blue-500 text-white";
      case "green":
        return "bg-green-500 text-white";
      case "red":
        return "bg-red-500 text-white";
      case "yellow":
        return "bg-yellow-400 text-white";
      case "purple":
        return "bg-purple-500 text-white";
      case "orange":
        return "bg-orange-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  }, [color]);

  if (isLoading) {
    return (
      <Card className="w-full px-2 py-2 flex flex-col gap-2 rounded-xl animate-pulse h-[84px] bg-ios-gray-200 dark:bg-ios-gray-900" />
    );
  }
  return (
    <Card
      className="w-full px-2 py-2 flex flex-col gap-2 rounded-xl"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <Button
          variant="iOSPrimary"
          size="icon"
          className={cn("rounded-xl w-9 h-9", buttonColor)}
        >
          <Icon />
        </Button>
        <h2 className="text-2xl font-bold">{count}</h2>
      </div>
      <h1 className="text-ios-gray-700 dark:text-ios-gray-300">{title}</h1>
    </Card>
  );
};
