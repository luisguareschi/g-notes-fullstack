"use client";
import { BackButton } from "@/components/common/back-button";
import { ModeToggle } from "@/components/mode-toggle";
import { ProfileButton } from "@/components/common/profile-button";
import { IOSFormCard } from "@/components/common/ios-form/ios-form-card";
import { IOSInput } from "@/components/common/ios-form/ios-input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MinusCircle, Share } from "lucide-react";
import {
  useDeleteVaultsId,
  useGetVaultsId,
  usePostVaultsRemoveMember,
  usePostVaultsShare,
} from "@/orval/generated/vaults/vaults";
import { useLocalSettings } from "@/hooks/use-local-settings";
import { QUERY_KEYS } from "@/queries/queryKeys";
import FullScreenLoading from "@/components/common/full-screen-loading";
import { useSession } from "@/lib/auth-client";
import { GetVaultResponseMembersItem } from "@/orval/generated/openAPI.schemas";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { parsePrismaError } from "@/lib/parse-prisma-error";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

const ManageVaultPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session, isPending: isLoadingSession } = useSession();
  const selectedVaultId = useLocalSettings((state) => state.selectedVaultId);
  const setSelectedVaultId = useLocalSettings(
    (state) => state.setSelectedVaultId,
  );
  const { mutate: deleteVault, isPending: isDeletingVault } = useDeleteVaultsId(
    {
      mutation: {
        onSuccess: async () => {
          toast.success("Vault deleted successfully");
          router.replace("/home");
          setSelectedVaultId(null);
          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.vaultsList],
          });
        },
        onError: (error) => {
          toast.error(parsePrismaError(error, "Failed to delete vault"));
        },
      },
    },
  );
  const { mutate: removeMember, isPending: isRemovingMember } =
    usePostVaultsRemoveMember({
      mutation: {
        onSuccess: async () => {
          toast.success("Member removed successfully");
          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.vaultDetails, selectedVaultId],
          });
        },
        onError: (error) => {
          toast.error(parsePrismaError(error, "Failed to remove member"));
        },
      },
    });
  const { mutate: leaveVault, isPending: isLeavingVault } =
    usePostVaultsRemoveMember({
      mutation: {
        onSuccess: async () => {
          toast.success("You have left the vault");
          router.replace("/home");
          setSelectedVaultId(null);
          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.vaultsList],
          });
        },
        onError: (error) => {
          toast.error(parsePrismaError(error, "Failed to leave vault"));
        },
      },
    });
  const {
    data: vault,
    isLoading: isLoadingVault,
    isError: isErrorVault,
  } = useGetVaultsId(selectedVaultId ?? "", {
    query: {
      queryKey: [QUERY_KEYS.vaultDetails, selectedVaultId],
      refetchInterval: 5000,
    },
  });
  const { mutate: shareVault, isPending: isSharingVault } = usePostVaultsShare({
    mutation: {
      onSuccess: async (data) => {
        try {
          await navigator.clipboard.writeText(data.vaultKey);
          toast.success("Vault key copied to clipboard");
          window.alert("Vault key generated: " + data.vaultKey);
        } catch (error) {
          window.alert("Vault key generated: " + data.vaultKey);
        }
      },
      onError: (error) => {
        toast.error(parsePrismaError(error, "Failed to share vault"));
      },
    },
  });

  const handleDeleteOrLeaveVault = () => {
    if (isOwner) {
      deleteVault({ id: selectedVaultId ?? "" });
      return;
    }

    leaveVault({
      data: {
        userId: session?.user?.id ?? "",
        vaultId: selectedVaultId ?? "",
      },
    });
  };

  const handleRemoveMember = (memberId: string) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      removeMember({
        data: {
          userId: memberId,
          vaultId: selectedVaultId ?? "",
        },
      });
    }
  };

  const handleShareVault = async () => {
    if (selectedVaultId) {
      shareVault({
        data: {
          vaultId: selectedVaultId,
        },
      });
    }
  };

  const getMemberLabel = (member: GetVaultResponseMembersItem) => {
    if (session?.user?.id === member.id) {
      return "You";
    }
    if (member.id === vault?.owner.id) {
      return "Owner";
    }
    return "Member";
  };

  const isLoading = isLoadingSession || isLoadingVault;

  const isOwner = vault?.owner.id === session?.user?.id;

  const canRemoveMember = (memberId: string) => {
    return (
      isOwner && memberId !== vault?.owner.id && memberId !== session?.user?.id
    );
  };

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (!isLoading && (isErrorVault || !vault))
    return (
      <div className="flex flex-col justify-start h-svh p-4 gap-4 overflow-y-auto pb-10">
        <section className="flex w-full items-center">
          <BackButton />
          <ModeToggle className="ml-auto" />
        </section>
        <h1 className="text-3xl font-bold">Vault not found</h1>
        <p className="text-sm text-ios-gray-500">
          The vault you are looking for does not exist.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col justify-start h-svh p-4 gap-4 overflow-y-auto pb-10">
      <section className="flex w-full items-center">
        <BackButton />
        <ModeToggle className="ml-auto" />
        <ProfileButton />
      </section>

      <h1 className="text-3xl font-bold">Manage Vault</h1>
      {isOwner && vault?.name !== "Personal" && (
        <Button
          variant="text"
          className="w-fit p-0"
          onClick={handleShareVault}
          size="sm"
        >
          {isSharingVault && <Spinner className="w-4 h-4" />}
          {!isSharingVault && <Share className="w-4 h-4" />}
          Share Vault
        </Button>
      )}

      <div className="mt-4 flex flex-col gap-2">
        <h2 className="text-sm font-normal text-ios-gray-500 uppercase ml-1">
          Vault Information
        </h2>
        <IOSFormCard>
          <IOSInput
            key="vault-name"
            label="Name"
            value={vault?.name}
            inputProps={{ readOnly: true }}
            hideCard
          />
          <IOSInput
            key="vault-owner"
            label="Owner"
            value={`${vault?.owner.name} (${vault?.owner.email})`}
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
          {vault?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              {canRemoveMember(member.id) && (
                <Button
                  variant="textDestructive"
                  size="icon"
                  className="w-6 h-6 p-0 text-red-500 hover:text-red-600 hover:bg-transparent"
                  onClick={() => handleRemoveMember(member.id)}
                >
                  {isRemovingMember && <Spinner className="w-4 h-4" />}
                  {!isRemovingMember && <MinusCircle size={20} />}
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
                {getMemberLabel(member)}
              </span>
            </div>
          ))}
        </IOSFormCard>
      </div>

      <div className="mt-8 flex justify-center">
        {vault?.name !== "Personal" && (
          <Button
            variant="textDestructive"
            className="w-fit"
            onClick={handleDeleteOrLeaveVault}
            size="sm"
          >
            {(isDeletingVault || isLeavingVault) && (
              <Spinner className="w-4 h-4" />
            )}
            {vault?.owner.id === session?.user?.id
              ? "Delete Vault"
              : "Leave Vault"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ManageVaultPage;
