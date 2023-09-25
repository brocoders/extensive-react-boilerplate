import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";

type FullPageLoaderType = {
  isLoading: boolean;
};

export function FullPageLoader({ isLoading }: FullPageLoaderType) {
  return (
    <Modal open={isLoading}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
        }}
      >
        <CircularProgress />
      </Box>
    </Modal>
  );
}
