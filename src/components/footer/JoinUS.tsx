"use client";
// @mui
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";

// @project
import SvgIcon from "@/components/SvgIcon";
import Typeset from "@/components/Typeset";

/***************************  FOOTER - JOIN US  ***************************/

interface JoinUSProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stackProps: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headingProps: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  captionProps: Record<string, any>;
}

export default function JoinUS({
  stackProps,
  headingProps,
  captionProps,
}: JoinUSProps) {
  const theme = useTheme();
  const { sx, ...rest } = stackProps;

  return (
    <Stack {...rest} sx={{ gap: 2, ...sx }}>
      <Typeset
        {...{
          heading: "Join our newsletter",
          caption:
            "Discover the features that will transform your customer relationships",
          stackProps: { sx: { gap: 0.5, width: { xs: 1, md: "60%" } } },
          headingProps: { variant: "h4", ...headingProps },
          captionProps: { variant: "body1", ...captionProps },
        }}
      />
      <OutlinedInput
        placeholder="Enter your email address"
        endAdornment={
          <IconButton
            sx={{
              px: 3,
              py: 2,
              bgcolor: "primary.main",
              borderRadius: 25,
              "&:hover": { bgcolor: "primary.dark", boxShadow: 1 },
            }}
            rel="noopener noreferrer"
            aria-label="send"
          >
            <SvgIcon
              name="tabler-send"
              size={16}
              color="background.default"
              stroke={2}
            />
          </IconButton>
        }
        slotProps={{ input: { "aria-label": "Email address" } }}
        sx={{
          ...theme.typography.caption,
          color: "text.primary",
          maxWidth: 400,
          width: 1,
          pr: 0.5,
          "& .MuiOutlinedInput-input": {
            p: "18px 24px",
          },
          "& .MuiOutlinedInput-notchedOutline": { borderRadius: 25 },
        }}
      />
    </Stack>
  );
}
