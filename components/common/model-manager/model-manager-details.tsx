import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { BarLoader } from "../bar-loader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { AutoDisplayRowField } from "./auto-display-row-field";

export type FieldSettings = {
  readonly?: boolean;
  enumValues?: string[];
};

interface ModelManagerDetailsProps<T> {
  modelData?: T;
  modelFields: (keyof T)[];
  fieldSettings?: {
    [K in keyof T]?: FieldSettings;
  };
  isLoading?: boolean;
  isFetching?: boolean;
  onDelete?: () => void;
  onUpdate?: (data: T) => void;
}

export const ModelManagerDetails = <T,>({
  modelData,
  modelFields,
  fieldSettings,
  isLoading,
  isFetching,
  onDelete,
  onUpdate,
}: ModelManagerDetailsProps<T>) => {
  const [formData, setFormData] = useState<T>(modelData as T);
  const router = useRouter();
  const hasFormDataChanged = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(modelData);
  }, [formData, modelData]);

  useEffect(() => {
    setFormData(modelData as T);
  }, [modelData]);

  useEffect(() => {
    if (!modelData && !isFetching) {
      router.back();
    }
  }, [modelData, isFetching]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <BarLoader className="min-w-[300px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-10">
      <Button
        variant="link"
        className="mr-auto"
        size="sm"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back
      </Button>
      <Card>
        <CardContent className="pt-6">
          <FieldGroup>
            {modelFields.map((field, index) => {
              const value = formData?.[field];
              return (
                <Field key={field as string}>
                  <FieldLabel>{field as string}</FieldLabel>
                  <AutoDisplayRowField
                    value={value as string}
                    fieldSettings={fieldSettings?.[field]}
                    onChange={(value) =>
                      setFormData({ ...formData, [field]: value })
                    }
                  />
                  {index !== modelFields.length - 1 && <FieldSeparator />}
                </Field>
              );
            })}
          </FieldGroup>
        </CardContent>
      </Card>
      <div className="flex gap-2 justify-end">
        {onDelete && (
          <Button variant="outline" onClick={onDelete}>
            Delete
          </Button>
        )}
        {onUpdate && (
          <Button
            variant="default"
            onClick={() => onUpdate?.(formData as T)}
            disabled={!hasFormDataChanged}
          >
            Update
          </Button>
        )}
      </div>
    </div>
  );
};
