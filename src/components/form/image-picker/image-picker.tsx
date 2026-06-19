"use client";
import { useFileUploadService } from "@/services/api/services/files";
import type { FileEntity } from "@/services/api/types/file-entity";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import X from "lucide-react/dist/esm/icons/x";
import { useCallback, useState, type MouseEvent, type ReactNode } from "react";
import { useDropzone } from "react-dropzone";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ImagePickerProps = {
  error?: string;
  onChange: (value: FileEntity | null) => void;
  onBlur: () => void;
  value?: FileEntity;
  disabled?: boolean;
  testId?: string;
  label?: ReactNode;
};

function ImagePicker(props: ImagePickerProps) {
  const { onChange } = props;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const fetchFileUpload = useFileUploadService();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsLoading(true);
      const { status, data } = await fetchFileUpload(acceptedFiles[0]);
      if (status === HTTP_CODES_ENUM.CREATED) {
        onChange(data.file);
      }
      setIsLoading(false);
    },
    [fetchFileUpload, onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/webp": [],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2, // 2MB
    disabled: isLoading || props.disabled,
  });

  const removeImageHandle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChange(null);
  };

  return (
    <div
      {...getRootProps()}
      className="relative mt-4 flex cursor-pointer flex-col items-center rounded-md border border-dashed border-border p-4 hover:border-foreground"
    >
      {isDragActive && (
        <div className="absolute inset-0 z-10 bg-black/50">
          <p className="mt-10 text-center text-xl font-bold text-white">
            {t("common:formInputs.singleImageInput.dropzoneText")}
          </p>
        </div>
      )}
      {props?.value ? (
        <div className="grid w-full grid-cols-3 gap-2">
          <div className="group/img relative h-[250px] overflow-hidden rounded-md">
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-500 group-hover/img:opacity-100">
              <button
                type="button"
                aria-label="remove"
                onClick={removeImageHandle}
                className="text-white"
              >
                <X className="size-12" />
              </button>
            </div>
            <img
              src={props.value.path}
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="mt-4">
        <Button
          asChild
          data-testid={props.testId}
          className={cn(isLoading && "pointer-events-none opacity-50")}
        >
          <label onClick={(event) => event.stopPropagation()}>
            {isLoading
              ? t("common:loading")
              : t("common:formInputs.singleImageInput.selectFile")}
            <input {...getInputProps()} />
          </label>
        </Button>
      </div>

      <div className="mt-2">
        <p>{t("common:formInputs.singleImageInput.dragAndDrop")}</p>
      </div>

      {props.error && (
        <div className="mt-2">
          <p className="text-destructive">{props.error}</p>
        </div>
      )}
    </div>
  );
}

function FormImagePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue"> & {
    disabled?: boolean;
    testId?: string;
    label?: ReactNode;
  }
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <ImagePicker
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          error={fieldState.error?.message}
          disabled={props.disabled}
          testId={props.testId}
          label={props.label}
        />
      )}
    />
  );
}

export default FormImagePicker;
