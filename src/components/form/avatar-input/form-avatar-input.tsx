import { useFileUploadService } from "@/services/api/services/files";
import { FileEntity } from "@/services/api/types/file-entity";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

type AvatarInputProps = {
  error?: string;
  onChange: (value: FileEntity) => void;
  onBlur: () => void;
  value?: FileEntity;
  disabled?: boolean;
};

const AvatarInputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  border: "1px dashed",
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",

  "&:hover": {
    borderColor: theme.palette.text.primary,
  },
}));

function AvatarInput(props: AvatarInputProps) {
  const { onChange } = props;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const fetchFileUpload = useFileUploadService();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsLoading(true);
      const { status, data } = await fetchFileUpload(acceptedFiles[0]);
      if (status === HTTP_CODES_ENUM.CREATED) {
        onChange(data);
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
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2, // 2MB
    disabled: isLoading || props.disabled,
  });

  return (
    <AvatarInputContainer {...getRootProps()}>
      {isDragActive && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              mt: 10,
            }}
            variant="h5"
          >
            {t("common:formInputs.avatarInput.dropzoneText")}
          </Typography>
        </Box>
      )}
      <Avatar
        sx={{
          width: 100,
          height: 100,
        }}
        src={props.value?.path}
      />
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" component="label" disabled={isLoading}>
          {isLoading
            ? t("common:loading")
            : t("common:formInputs.avatarInput.selectFile")}
          <input {...getInputProps()} />
        </Button>
      </Box>

      <Box sx={{ mt: 1 }}>
        <Typography>
          {t("common:formInputs.avatarInput.dragAndDrop")}
        </Typography>
      </Box>

      {props.error && (
        <Box sx={{ mt: 1 }}>
          <Typography sx={{ color: "red" }}>{props.error}</Typography>
        </Box>
      )}
    </AvatarInputContainer>
  );
}

function FormAvatarInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue"> & {
    disabled?: boolean;
  }
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <AvatarInput
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          error={fieldState.error?.message}
          disabled={props.disabled}
        />
      )}
    />
  );
}

export default FormAvatarInput;
