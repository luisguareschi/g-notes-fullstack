import { Checkbox } from "@/components/ui/checkbox";
import dayjs from "dayjs";
interface AutoDisplayRowValueProps {
  value: any;
}
export const AutoDisplayRowValue = ({ value }: AutoDisplayRowValueProps) => {
  if (value === undefined || value === null) {
    return (
      <code className="bg-zinc-100 text-zinc-900 relative rounded px-[0.3rem] py-[0.2rem] font-mono text-xs">
        blank
      </code>
    );
  }
  if (typeof value === "boolean") {
    return <Checkbox checked={value} className="pointer-events-none" />;
  }
  if (typeof value === "string" && dayjs(value).isValid()) {
    return <div>{dayjs(value).format("DD/MM/YYYY - HH:mm")}</div>;
  }
  return <div>{value}</div>;
};
