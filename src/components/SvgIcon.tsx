"use client";
import PropTypes from "prop-types";

// @mui
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

//@project
import { IconType } from "@/enum";

// @types

const spritePaths = {
  [IconType.STROKE]: "/assets/svg/tabler-sprite-outline.svg",
  [IconType.FILL]: "/assets/svg/tabler-sprite-fill.svg",
  [IconType.CUSTOM]: "/assets/svg/sprite-custom.svg",
};

interface SvgIconProps {
  name: string;
  size?: number;
  type?: IconType;
  color?: string;
  stroke?: number;
  twoToneColor?: string;
}

export default function SvgIcon({
  name,
  size = 24,
  type = IconType.STROKE,
  color,
  stroke,
  twoToneColor,
}: SvgIconProps) {
  const theme = useTheme();

  const fillColor =
    type !== IconType.STROKE
      ? twoToneColor || theme.palette.primary.light
      : undefined;
  const strokeColor =
    type !== IconType.FILL
      ? color ||
        (type === IconType.CUSTOM
          ? theme.palette.text.primary
          : theme.palette.primary.main)
      : undefined;

  const defaultStroke = size <= 24 ? 2.5 : size <= 32 ? 2 : 1.5;
  const strokeWidth =
    stroke !== undefined
      ? stroke
      : type === IconType.CUSTOM
        ? defaultStroke
        : type !== IconType.FILL
          ? 1.5
          : undefined;

  return (
    <Box
      role="none"
      sx={{
        "& svg": {
          verticalAlign: "middle",
          display: "block",
          color:
            color ||
            (type === IconType.CUSTOM ? "text.primary" : "primary.main"),
          '& [data-two-tone="true"]': {
            color: twoToneColor || theme.palette.primary.light,
          },
        },
      }}
    >
      <svg
        className={name}
        width={size}
        height={size}
        {...(fillColor && { fill: fillColor })}
        {...(strokeColor && { stroke: strokeColor })}
        {...(strokeWidth && { strokeWidth })}
      >
        <use xlinkHref={`${spritePaths[type]}#${name}`} />
      </svg>
    </Box>
  );
}
