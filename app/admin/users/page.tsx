"use client";
import { useGetUsers } from "@/orval/generated/users/users";
import { ModelManagerList } from "@/components/common/model-manager/model-manager-list";
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const { data = [], isLoading, isFetching } = useGetUsers();
  const router = useRouter();
  return (
    <ModelManagerList
      modelList={data}
      listFields={["id", "email", "name", "username"]}
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
        console.log(search);
      }}
    />
  );
};

export default UsersPage;
