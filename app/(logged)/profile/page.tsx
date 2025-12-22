"use client";
import { useGetUsersMe } from "@/orval/generated/users/users";
import { IOSFormCard } from "@/components/common/ios-form/ios-form-card";
import { IOSInput } from "@/components/common/ios-form/ios-input";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import FullScreenLoading from "@/components/common/full-screen-loading";
import { ModeToggle } from "@/components/mode-toggle";
import { ArrowLeft } from "lucide-react";
import { BackButton } from "@/components/common/back-button";

const ProfilePage = () => {
  const router = useRouter();
  const { data, isLoading } = useGetUsersMe();
  const user = data?.user;

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  if (isLoading || !user) {
    return <FullScreenLoading />;
  }

  return (
    <div className="flex flex-col justify-start h-svh p-4 gap-4">
      <section className="flex w-full items-center">
        <BackButton />
        <ModeToggle className="ml-auto" />
      </section>
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="mt-4 flex flex-col gap-2">
        <h2 className="text-sm font-normal text-ios-gray-500 uppercase">
          User Information
        </h2>
        <IOSFormCard>
          <IOSInput
            label="Name"
            value={user.name}
            hideCard
            inputProps={{ readOnly: true }}
          />
          <IOSInput
            label="Username"
            value={user.username ?? "-"}
            hideCard
            inputProps={{ readOnly: true }}
          />
          <IOSInput
            label="Email"
            value={user.email}
            hideCard
            inputProps={{ readOnly: true }}
          />
        </IOSFormCard>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          variant="textDestructive"
          className="w-fit"
          onClick={handleSignOut}
          size="sm"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
