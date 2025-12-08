import { Checkbox } from "@/components/ui/checkbox";
import { FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import { FieldSettings } from "./model-manager-details";

interface AutoDisplayRowFieldProps {
  value: any;
  onChange?: (value: any) => void;
  fieldSettings?: FieldSettings;
}
export const AutoDisplayRowField = ({
  value,
  onChange,
  fieldSettings,
}: AutoDisplayRowFieldProps) => {
  const isReadonly = fieldSettings?.readonly;
  const enumValues = fieldSettings?.enumValues;

  if (isReadonly && typeof value === "string" && dayjs(value).isValid()) {
    return (
      <FieldDescription>
        {dayjs(value).format("DD/MM/YYYY - HH:mm")}
      </FieldDescription>
    );
  }

  if (isReadonly) {
    return <FieldDescription>{value as string}</FieldDescription>;
  }

  if (typeof value === "boolean") {
    return (
      <Checkbox
        checked={value}
        className="max-w-4"
        onCheckedChange={(checked) => onChange?.(checked)}
      />
    );
  }

  if (enumValues) {
    return (
      <Select value={value} onValueChange={(value) => onChange?.(value)}>
        <SelectTrigger className="max-w-xs">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Options</SelectLabel>
            {enumValues.map((enumValue) => (
              <SelectItem key={enumValue} value={enumValue}>
                {enumValue}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  return (
    <Input
      value={value as string}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};
