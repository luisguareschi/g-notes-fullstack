"use client";
import { BackButton } from "@/components/common/back-button";
import { ModeToggle } from "@/components/mode-toggle";
import { ProfileButton } from "@/components/common/profile-button";
import { IOSFormCard } from "@/components/common/ios-form/ios-form-card";
import { IOSInput } from "@/components/common/ios-form/ios-input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MinusCircle } from "lucide-react";

const ManageVaultPage = () => {
  const currentVault = {
    name: "Personal Vault",
    owner: "John Doe",
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
    {
      id: "3",
      name: "Jim Beam",
      email: "jim@example.com",
      role: "Member",
    },
  ];

  const handleDeleteVault = () => {
    console.log("Delete vault clicked");
    alert("Delete vault logic would go here");
  };

  const handleRemoveMember = (memberId: string) => {
    window.confirm("Are you sure you want to remove this member?");
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
        <IOSFormCard>
          <IOSInput
            key="vault-name"
            label="Name"
            value={currentVault.name}
            inputProps={{ readOnly: true }}
            hideCard
          />
          <IOSInput
            key="vault-owner"
            label="Owner"
            value={currentVault.owner}
            inputProps={{ readOnly: true }}
            hideCard
          />
        </IOSFormCard>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <h2 className="text-sm font-normal text-ios-gray-500 uppercase ml-1">
          Members
        </h2>
        <IOSFormCard fullWidthSeparator>
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              {member.role !== "Owner" && (
                <Button
                  variant="textDestructive"
                  size="icon"
                  className="w-6 h-6 p-0 text-red-500 hover:text-red-600 hover:bg-transparent"
                  onClick={() => handleRemoveMember(member.id)}
                >
                  <MinusCircle size={20} />
                </Button>
              )}
              <Avatar>
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
