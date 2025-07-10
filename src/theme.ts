import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    primary: { main: "#1e40af" },
    secondary: { main: "#3b82f6" },
    background: {
      default: "#000",
      paper: "rgba(255,255,255,0.98)",
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiButton: {
      defaultProps: { variant: "contained" },
      styleOverrides: {
        root: {
          borderRadius: 5,
          padding: "12px 18px",
          textTransform: "none",
          boxShadow: "none",
          transition: "transform .2s, box-shadow .2s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#1e40af",
          color: "#fff",
          textTransform: "uppercase",
          fontSize: "16px",
          borderBottom: "1px solid rgba(0,0,0,0.12)",
          "&:first-of-type": {
            borderTopLeftRadius: 20,
          },
          "&:last-of-type": {
            borderTopRightRadius: 20,
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          borderRadius: 9999,
          padding: "0 8px",
          textTransform: "uppercase",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          backgroundImage: "none",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: "#3b82f6",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h3: {
          fontFamily: '"Lexend Deca", Inter, sans-serif',
          fontSize: "36px",
          fontWeight: 700,
          color: "#1e293b",
        },
        h4: {
          fontFamily: '"Lexend Deca", Inter, sans-serif',
          fontWeight: 700,
          color: "#1e293b",
        },
      },
    },
  },
});

export default theme;
