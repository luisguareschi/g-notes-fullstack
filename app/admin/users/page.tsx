"use client";
import { ModelManagerList } from "@/components/common/model-manager/model-manager-list";
import { useGetAdminUsers } from "@/orval/generated/admin/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const {
    data = [],
    isLoading,
    isFetching,
  } = useGetAdminUsers({
    search: search,
  });
  const router = useRouter();
  return (
    <ModelManagerList
      modelList={data}
      listFields={["id", "email", "name", "username", "createdAt", "updatedAt"]}
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
