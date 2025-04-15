"use client";

// @mui
import Card from "@mui/material/Card";
import { Theme } from "@mui/material/styles";

interface MainCardProps {
  children: React.ReactNode;
  sx?: object | ((theme: any) => object);
  ref?: React.Ref<HTMLDivElement>;
  [key: string]: any;
}

export default function MainCard({
  children,
  sx = {},
  ref,
  ...others
}: MainCardProps) {
  const defaultSx = (theme: Theme) => ({
    p: { xs: 1.75, sm: 2.25, md: 3 },
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
    // boxShadow: theme.customShadows.section
  });

  const combinedSx = (theme: Theme) => ({
    ...defaultSx(theme),
    ...(typeof sx === "function" ? sx(theme) : sx),
  });

  return (
    <Card ref={ref} elevation={0} sx={combinedSx} {...others}>
      {children}
    </Card>
  );
}

MainCard.propTypes = {
  children: PropTypes.any,
  sx: PropTypes.object,
  others: PropTypes.any,
};
