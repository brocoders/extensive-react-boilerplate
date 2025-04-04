// @mui
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// @project
import SvgIcon from "../SvgIcon";

// @types

/***************************  FAQ - DETAILS  ***************************/

interface Answer {
  type?: "list";
  content?: string;
  data?: { primary: string }[];
  color?: "white" | "primary";
}

export default function FaqDetails({ answer }: { answer: Answer | string }) {
  const theme = useTheme();
  const colorData = {
    white: theme.palette.background.default,
    primary: theme.palette.grey[100],
  };

  if (typeof answer !== "object") {
    return <Typography sx={{ color: "text.secondary" }}>{answer}</Typography>;
  } else {
    switch (answer.type) {
      case "list":
        return (
          <>
            <Typography
              sx={{ color: "text.secondary", mb: { xs: 2, md: 2.5 } }}
            >
              {answer.content}
            </Typography>
            <List
              disablePadding
              sx={{
                "& .MuiListItem-root:first-of-type": { pt: 0 },
                "& .MuiListItem-root:last-of-type": { pb: 0 },
              }}
            >
              {answer.data?.map((item, index) => (
                <ListItem
                  key={"123" + index}
                  sx={{ px: 0, py: { xs: 0.75, md: 1 } }}
                >
                  <ListItemAvatar sx={{ minWidth: 34, height: 24 }}>
                    <Stack
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        bgcolor: answer.color
                          ? colorData[answer.color]
                          : "transparent",
                      }}
                    >
                      <SvgIcon
                        name="tabler-check"
                        color="primary.main"
                        size={16}
                      />
                    </Stack>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.primary}
                    primaryTypographyProps={{ color: "text.secondary" }}
                    sx={{ m: 0 }}
                  />
                </ListItem>
              ))}
            </List>
          </>
        );
    }
  }
}
