import Link from "next/link";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";

interface ProfileButtonProps {
  className?: string;
}

export const ProfileButton = ({ className }: ProfileButtonProps) => {
  return (
    <Link href="/profile" className={className}>
      <Button variant="text" size="icon">
        <CircleUser className="min-w-6 min-h-6" />
      </Button>
    </Link>
  );
};
