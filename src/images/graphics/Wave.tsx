// @mui
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

/***************************  IMAGE - WAVE  ***************************/

export default function Wave({ size }: { size: number }) {
  const theme = useTheme();

  return (
    <Stack
      className="wave"
      sx={{ "& svg": { width: size || { xs: 92, sm: 122 }, height: 10 } }}
    >
      <svg viewBox="0 0 122 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          opacity="0.4"
          d="M1.46484 6.83613L4.45387 3.7103C7.74598 0.267505 13.38 0.760513 16.0241 4.72277L16.5428 5.50001C19.2423 9.54539 25.1877 9.54539 27.8873 5.5V5.5C30.5869 1.45461 36.5322 1.45461 39.2318 5.5V5.5C41.9314 9.54539 47.8768 9.54539 50.5764 5.5V5.5C53.2759 1.45461 59.2213 1.45461 61.9209 5.5V5.5C64.6205 9.54539 70.5658 9.54539 73.2654 5.5V5.5C75.965 1.45461 81.9104 1.45461 84.61 5.5V5.5C87.3096 9.54539 93.2549 9.54539 95.9545 5.5V5.5C98.6541 1.45461 104.599 1.45461 107.299 5.5V5.5C109.999 9.54539 115.944 9.54539 118.644 5.5L120.534 2.66667"
          stroke={theme.palette.primary.main}
          strokeLinecap="round"
        />
      </svg>
    </Stack>
  );
}
