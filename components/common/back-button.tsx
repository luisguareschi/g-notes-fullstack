import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  className?: string;
}

export const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();
  return (
    <Button
      variant="text"
      size="default"
      onClick={() => router.back()}
      className={cn("p-0", className)}
    >
      <ArrowLeft className="min-w-6 min-h-6" />
      Back
    </Button>
  );
};
