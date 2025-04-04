'use client';

// @mui
import { useTheme } from '@mui/material/styles';

/***************************  IMAGE - STAR  ***************************/

export default function Star() {
  const theme = useTheme();

  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.5 0C9.95718 3.93797 13.062 7.04282 17 8.5C13.062 9.95718 9.95718 13.062 8.5 17C7.04282 13.062 3.93797 9.95718 0 8.5C3.93797 7.04282 7.04282 3.93797 8.5 0Z"
        fill={theme.palette.grey[300]}
      />
    </svg>
  );
}
