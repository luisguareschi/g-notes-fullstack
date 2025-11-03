import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpRightIcon } from "lucide-react";

const MainPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>BaseApp Admin</EmptyTitle>
          <EmptyDescription>
            Welcome to the BaseApp Admin panel. Here you can manage the users,
            courses, and other content.
          </EmptyDescription>
        </EmptyHeader>
        <Button variant="link" asChild size="sm">
          <a href="#">
            Go to Dashboard <ArrowUpRightIcon />
          </a>
        </Button>
      </Empty>
    </div>
  );
};

export default MainPage;
