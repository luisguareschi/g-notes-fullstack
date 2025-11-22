"use client";
import { ModelManagerDetails } from "@/components/common/model-manager/model-manager-details";
import { useAdminPrismaMutation } from "@/queries/prismaQuery/useAdminPrismaMutation";
import { useAdminPrismaQuery } from "@/queries/prismaQuery/useAdminPrismaQuery";

const UserPage = ({ params }: { params: { id: string } }) => {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useAdminPrismaQuery({
    model: "User",
    action: "findUnique",
    where: {
      id: params.id,
    },
  });
  const { mutate: deleteUser } = useAdminPrismaMutation({
    model: "User",
    action: "delete",
  });
  const { mutate: updateUser } = useAdminPrismaMutation({
    model: "User",
    action: "update",
  });

  return (
    <div className="flex flex-col gap-4 h-full">
      <ModelManagerDetails
        modelData={user}
        modelFields={Object.keys(user ?? {}) as (keyof typeof user)[]}
        fieldSettings={{
          id: {
            readonly: true,
          },
          email: {
            readonly: true,
          },
          createdAt: {
            readonly: true,
          },
          updatedAt: {
            readonly: true,
          },
        }}
        isLoading={isLoading}
        isFetching={isFetching}
        onDelete={() => {
          deleteUser({
            where: {
              id: params.id,
            },
          });
        }}
        onUpdate={(data) => {
          updateUser({
            where: {
              id: params.id,
            },
            data: {
              ...data,
              sessions: undefined,
              accounts: undefined,
            },
          });
        }}
      />
    </div>
  );
};

export default UserPage;
