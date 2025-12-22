"use client";
import { BackButton } from "@/components/common/back-button";
import { ModeToggle } from "@/components/mode-toggle";
import { ProfileButton } from "@/components/common/profile-button";
import { IOSFormCard } from "@/components/common/ios-form/ios-form-card";
import { IOSInput } from "@/components/common/ios-form/ios-input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ManageVaultPage = () => {
  const currentVault = {
    name: "Personal Vault",
  };

  const members = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Owner",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Member",
    },
  ];

  const handleDeleteVault = () => {
    console.log("Delete vault clicked");
    alert("Delete vault logic would go here");
  };

  return (
    <div className="flex flex-col justify-start h-svh p-4 gap-4 overflow-y-auto pb-10">
      <section className="flex w-full items-center">
        <BackButton />
        <ModeToggle className="ml-auto" />
        <ProfileButton />
      </section>

      <h1 className="text-3xl font-bold">Manage Vault</h1>

      <div className="mt-4 flex flex-col gap-2">
        <h2 className="text-sm font-normal text-ios-gray-500 uppercase ml-1">
          Vault Information
        </h2>
        <IOSInput
          key="vault-name"
          label="Name"
          value={currentVault.name}
          inputProps={{ readOnly: true }}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <h2 className="text-sm font-normal text-ios-gray-500 uppercase ml-1">
          Members
        </h2>
        <IOSFormCard fullWidthSeparator>
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {member.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{member.name}</span>
                <span className="text-xs text-ios-gray-500">
                  {member.email}
                </span>
              </div>
              <span className="ml-auto text-xs text-ios-gray-500">
                {member.role}
              </span>
            </div>
          ))}
        </IOSFormCard>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          variant="textDestructive"
          className="w-fit"
          onClick={handleDeleteVault}
          size="sm"
        >
          Delete Vault
        </Button>
      </div>
    </div>
  );
};

export default ManageVaultPage;
