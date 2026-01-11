import { Button } from "../ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Card } from "../ui/card";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface ListItemValue {
  value: string;
  id: string;
}

interface ListInputProps {
  value: ListItemValue[] | undefined;
  onChange?: (value: ListItemValue[]) => void;
  readonly?: boolean;
}

export const ListInput = ({
  value,
  onChange,
  readonly = false,
}: ListInputProps) => {
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (newItem.length === 0) return;
    if (!onChange) return;
    onChange([...(value || []), { value: newItem, id: crypto.randomUUID() }]);
    setNewItem("");
  };

  const handleRemove = (id: string) => {
    if (!onChange) return;
    onChange(value?.filter((item) => item.id !== id) || []);
  };

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    const newValues = [...(value || [])];
    newValues.find((item) => item.id === id)!.value = e.target.value;
    onChange(newValues);
  };

  const handleNewItemOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newItem.length > 0) {
        handleAdd();
      }
    }
  };

  return (
    <Card className="flex flex-col gap-2 py-2">
      <AnimatePresence>
        {value?.map((item, index) => (
          <>
            <motion.div
              key={item.id}
              className="flex items-center gap-2 p-2 px-4"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
            >
              {!readonly && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="rounded-full size-6 min-w-6 min-h-6"
                  onClick={() => handleRemove(item.id)}
                >
                  <MinusIcon />
                </Button>
              )}
              <Input
                value={item.value}
                onChange={(e) => handleChange(item.id, e)}
                className="border-none bg-transparent px-0 py-0 h-fit"
              />
            </motion.div>
            {index !== value.length - 1 && <Separator />}
          </>
        ))}
      </AnimatePresence>
      {!!value?.length && !readonly && <Separator />}
      {!readonly && (
        <div className="flex items-center gap-2 p-2 px-4">
          <Button
            variant="default"
            size="icon"
            className="rounded-full size-6 min-w-6 min-h-6 bg-green-500"
            onClick={() => handleAdd()}
          >
            <PlusIcon />
          </Button>
          <Input
            placeholder="Add new item"
            className="border-none bg-transparent px-0 py-0 h-fit"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleNewItemOnKeyDown}
          />
        </div>
      )}
    </Card>
  );
};
