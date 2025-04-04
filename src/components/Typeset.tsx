/* eslint-disable @typescript-eslint/no-explicit-any */
// @mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/***************************  COMMON - TYPESET  ***************************/

interface TypesetProps {
  heading: string;
  caption?: string;
  stackProps?: Record<string, any>;
  headingProps?: Record<string, any>;
  captionProps?: Record<string, any>;
}

export default function Typeset({
  heading,
  caption,
  stackProps,
  headingProps,
  captionProps,
}: TypesetProps) {
  const { sx, ...rest } = stackProps || {};

  return (
    <Stack {...rest} sx={{ gap: { xs: 1, sm: 1.5 }, ...sx }}>
      <Typography
        variant="h2"
        {...headingProps}
        sx={{ ...(headingProps?.sx && { ...headingProps.sx }) }}
      >
        {heading}
      </Typography>
      {caption && (
        <Typography
          component="p"
          variant="h6"
          {...captionProps}
          sx={{
            color: "text.secondary",
            ...(captionProps?.sx && { ...captionProps.sx }),
          }}
        >
          {caption}
        </Typography>
      )}
    </Stack>
  );
}
