"use client";
import Eye from "lucide-react/dist/esm/icons/eye";
import EyeOff from "lucide-react/dist/esm/icons/eye-off";
import { ChangeEvent, Ref, useState } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type TextInputProps = {
  label: string;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  testId?: string;
  autoComplete?: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  size?: "small" | "medium";
};

function TextInput(
  props: TextInputProps & {
    name: string;
    value: string;
    onChange: (
      value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBlur: () => void;
    ref?: Ref<HTMLInputElement | HTMLTextAreaElement | null>;
  }
) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const isPassword = props.type === "password";
  const inputId = `text-input-${props.name}`;

  const handleClickShowPassword = () => setIsShowPassword((show) => !show);

  return (
    <div className="flex w-full flex-col gap-1.5">
      <Label htmlFor={inputId}>{props.label}</Label>
      <div className="relative">
        {props.multiline ? (
          <Textarea
            id={inputId}
            ref={props.ref as Ref<HTMLTextAreaElement>}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            autoFocus={props.autoFocus}
            readOnly={props.readOnly}
            disabled={props.disabled}
            autoComplete={props.autoComplete}
            rows={props.minRows}
            data-testid={props.testId}
            aria-invalid={!!props.error}
            className={cn(props.error && "border-destructive")}
          />
        ) : (
          <Input
            id={inputId}
            ref={props.ref as Ref<HTMLInputElement>}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            autoFocus={props.autoFocus}
            readOnly={props.readOnly}
            disabled={props.disabled}
            autoComplete={props.autoComplete}
            type={isPassword && isShowPassword ? "text" : props.type}
            data-testid={props.testId}
            aria-invalid={!!props.error}
            className={cn(
              props.error && "border-destructive",
              props.size === "small" && "h-8",
              isPassword && "pr-10"
            )}
          />
        )}
        {isPassword && (
          <button
            type="button"
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
          >
            {isShowPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        )}
      </div>
      {!!props.error && (
        <p
          data-testid={`${props.testId}-error`}
          className="text-sm text-destructive"
        >
          {props.error}
        </p>
      )}
    </div>
  );
}

function FormTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue"> &
    TextInputProps
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <TextInput
          {...field}
          label={props.label}
          autoFocus={props.autoFocus}
          type={props.type}
          error={fieldState.error?.message}
          disabled={props.disabled}
          readOnly={props.readOnly}
          testId={props.testId}
          multiline={props.multiline}
          minRows={props.minRows}
          maxRows={props.maxRows}
          autoComplete={props.autoComplete}
          size={props.size}
        />
      )}
    />
  );
}

export default FormTextInput;
