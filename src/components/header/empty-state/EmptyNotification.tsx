// @mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// @images
import ReadingSideDoodle from "@/images/illustration/ReadingSideDoodle";

/***************************  HEADER - EMPTY NOTIFICATION ***************************/

export default function EmptyNotification() {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: 236,
        textAlign: "center",
        gap: 1,
        p: 2,
      }}
    >
      <ReadingSideDoodle />
      <Typography variant="h6" sx={{ fontWeight: 400, maxWidth: 232 }}>
        Nothing to see here! You&apos;re all up to date.
      </Typography>
    </Stack>
  );
}
