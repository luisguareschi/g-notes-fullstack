"use client";
import { ModelManagerList } from "@/components/common/model-manager/model-manager-list";
import { useAdminPrismaQuery } from "@/queries/prismaQuery/useAdminPrismaQuery";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const {
    data = [],
    isLoading,
    isFetching,
  } = useAdminPrismaQuery({
    model: "User",
    action: "findMany",
    where: {
      OR: [
        { username: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const router = useRouter();
  return (
    <ModelManagerList
      modelList={data}
      listFields={[
        "id",
        "email",
        "name",
        "username",
        "role",
        "createdAt",
        "updatedAt",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      onRowClick={(row) => {
        router.push(`/admin/users/${row.id}`);
      }}
      onDeleteSelected={(rows) => {
        console.log(rows);
      }}
      onAddNew={() => {
        console.log("add new");
      }}
      onSearch={(search) => {
        setSearch(search);
      }}
    />
  );
};

export default UsersPage;
