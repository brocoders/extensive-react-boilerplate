// @mui
import Stack from "@mui/material/Stack";

// @assets
import PageLoader from "@/images/graphics/PageLoader";

/***************************  COMMON - LOADER  ***************************/

export default function Loader() {
  return (
    <Stack
      sx={{
        height: "100vh",
        width: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PageLoader />
    </Stack>
  );
}
