"use client";
import { useFileUploadService } from "@/services/api/services/files";
import { FileEntity } from "@/services/api/types/file-entity";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";

type ImagePickerProps = {
  error?: string;
  onChange: (value: FileEntity | null) => void;
  onBlur: () => void;
  value?: FileEntity;
  disabled?: boolean;
  testId?: string;
  label?: React.ReactNode;
};

const ImagePickerContainer = styled("div")(({ theme }) => ({
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

const StyledOverlay = styled("div")(() => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.7)",
    transition: ".5s ease",
    opacity: 0,
    "&:hover": {
      opacity: 1,
    },
  };
});

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
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2, // 2MB
    disabled: isLoading || props.disabled,
  });

  const removeImageHandle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onChange(null);
  };

  return (
    <ImagePickerContainer {...getRootProps()}>
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
            {t("common:formInputs.singleImageInput.dropzoneText")}
          </Typography>
        </Box>
      )}
      {props?.value ? (
        <>
          <ImageList sx={{ width: `100%` }} cols={3} rowHeight={250}>
            <ImageListItem style={{ overflow: "hidden" }}>
              <StyledOverlay>
                <IconButton
                  disableRipple
                  onClick={removeImageHandle}
                  color="inherit"
                >
                  <ClearOutlinedIcon
                    sx={{ width: 50, height: 50, color: "white" }}
                  />
                </IconButton>
              </StyledOverlay>
              <img src={props.value.path} loading="lazy" />
            </ImageListItem>
          </ImageList>
        </>
      ) : (
        <></>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          component="label"
          disabled={isLoading}
          data-testid={props.testId}
        >
          {isLoading
            ? t("common:loading")
            : t("common:formInputs.singleImageInput.selectFile")}
          <input {...getInputProps()} />
        </Button>
      </Box>

      <Box sx={{ mt: 1 }}>
        <Typography>
          {t("common:formInputs.singleImageInput.dragAndDrop")}
        </Typography>
      </Box>

      {props.error && (
        <Box sx={{ mt: 1 }}>
          <Typography sx={{ color: "red" }}>{props.error}</Typography>
        </Box>
      )}
    </ImagePickerContainer>
  );
}

function FormImagePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue"> & {
    disabled?: boolean;
    testId?: string;
    label?: React.ReactNode;
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
