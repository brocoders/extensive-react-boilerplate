import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { styled, useColorScheme } from "@mui/material/styles";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: "transparent",
  },
}));

const ModeThemeSwitcher = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <StyledIconButton
        disableRipple
        onClick={() => {
          if (mode === "light") {
            setMode("dark");
          } else {
            setMode("light");
          }
        }}
        color="inherit"
      >
        {mode === "dark" ? (
          <Brightness7Icon sx={{ width: 35, height: 35 }} />
        ) : (
          <Brightness4Icon sx={{ width: 35, height: 35 }} />
        )}
      </StyledIconButton>
    </>
  );
};

export default ModeThemeSwitcher;
