import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IOSInputProps {
  label: string;
  placeholder?: string;
  value?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  icon?: React.ReactNode;
  hideCard?: boolean;
}

export const IOSInput = ({
  label,
  placeholder,
  value,
  onChange,
  inputProps,
  labelProps,
  icon,
  hideCard,
}: IOSInputProps) => {
  const Body = () => (
    <>
      <label
        {...labelProps}
        className={cn("w-20 max-w-20 min-w-20", labelProps?.className)}
      >
        {label}
      </label>
      <input
        {...inputProps}
        className={cn(
          "placeholder:text-ios-gray-400 focus:outline-none read-only:text-ios-gray-500 w-full",
          inputProps?.className,
        )}
        placeholder={placeholder}
        onChange={onChange}
        value={value ?? undefined}
      />
      {icon && <div className="w-4 h-4">{icon}</div>}
    </>
  );

  if (hideCard) {
    return (
      <div className="flex gap-2">
        <Body />
      </div>
    );
  }

  return (
    <Card className="p-3 flex gap-2">
      <Body />
    </Card>
  );
};
