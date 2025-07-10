import Container from "@mui/material/Container";
import type { ContainerProps } from "@mui/material/Container";
import { SxProps, Theme } from "@mui/material/styles";

/**
 * Fluid container used across pages
 * expands to available width/height with responsive padding
 */
export default function PageContainer({
  children,
  sx,
  ...props
}: ContainerProps & { sx?: SxProps<Theme> }) {
  return (
    <Container
      maxWidth={false}
      sx={{
        width: "100%",
        minHeight: "100%",
        p: { xs: 2, sm: 3, md: 4 },
        ...(sx as object),
      }}
      {...props}
    >
      {children}
    </Container>
  );
}
