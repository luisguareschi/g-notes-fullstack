"use client";
import { ModelManagerDetails } from "@/components/common/model-manager/model-manager-details";
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
          console.log("delete");
        }}
        onUpdate={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
};

export default UserPage;
