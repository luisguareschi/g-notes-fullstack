import { Input } from "@/components/ui/input";
import { DataTable } from "../data-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { BarLoader } from "../bar-loader";

interface ModelManagerProps<T> {
  modelList: T[];
  listFields: (keyof T)[];
  isLoading: boolean;
  isFetching: boolean;
  onRowClick?: (row: T) => void;
  onDeleteSelected?: (rows: T[]) => void;
  onAddNew?: () => void;
  onSearch?: (search: string) => void;
}

export const ModelManager = <T,>({
  modelList,
  listFields,
  isLoading,
  isFetching,
  onRowClick,
  onDeleteSelected,
  onAddNew,
  onSearch,
}: ModelManagerProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const dynamicColumns: ColumnDef<T>[] = listFields.map((field, index) => ({
    accessorKey: field as string,
    header: field as string,
    cell(props) {
      if (index === 0 && onRowClick) {
        return (
          <Button
            variant="link"
            className={cn("p-0 cursor-pointer")}
            onClick={() => onRowClick && onRowClick(props.row.original)}
          >
            {props.getValue() as string}
          </Button>
        );
      }
      return <p>{(props.getValue() as string) ?? "-"}</p>;
    },
  }));

  const columns: ColumnDef<T>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...dynamicColumns,
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <BarLoader className="min-w-[300px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-end">
        {onSearch && (
          <Input
            type="text"
            placeholder="Search"
            className="md:max-w-72 mr-auto"
            onChange={(e) => onSearch(e.target.value)}
          />
        )}
        {onAddNew && <Button onClick={onAddNew}>Add New</Button>}
        {onDeleteSelected && (
          <Button
            variant="outline"
            disabled={selectedRows.length === 0}
            onClick={() => onDeleteSelected(selectedRows)}
          >
            Delete
          </Button>
        )}
      </div>
      <DataTable
        columns={columns}
        data={modelList}
        onRowSelectionChange={setSelectedRows}
      />
      {!isFetching && (
        <div className="text-zinc-500 flex-1 text-sm">
          {selectedRows.length} of {modelList.length} row(s) selected.
        </div>
      )}
      {isFetching && (
        <div className="text-zinc-500 flex justify-start items-center gap-2 text-sm italic">
          Updating
          <Spinner />
        </div>
      )}
    </div>
  );
};
