// @mui
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/***************************  PROFILE  ***************************/

interface ProfileProps {
  avatar?: React.ComponentProps<typeof Avatar>;
  title?: React.ReactNode;
  caption?: React.ReactNode;
  label?: React.ReactNode;
  sx?: object;
  titleProps?: React.ComponentProps<typeof Typography>;
  captionProps?: React.ComponentProps<typeof Typography>;
}

export default function Profile({
  avatar,
  title,
  caption,
  label,
  sx,
  titleProps,
  captionProps,
}: ProfileProps) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        gap: 0.75,
        width: "fit-content",
        ...sx,
      }}
    >
      {avatar && <Avatar {...avatar} alt="profile" />}
      <Stack sx={{ gap: 0.25 }}>
        <Stack direction="row" sx={{ alignItems: "center", gap: 0.5 }}>
          <Typography
            variant="subtitle2"
            {...titleProps}
            sx={{ whiteSpace: "nowrap", ...titleProps?.sx }}
          >
            {title}
          </Typography>
          {label}
        </Stack>
        {caption && (
          <Typography
            variant="caption"
            {...captionProps}
            sx={{ color: "grey.700", ...captionProps?.sx }}
          >
            {caption}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

Profile.propTypes = {
  avatar: PropTypes.any,
  title: PropTypes.any,
  caption: PropTypes.any,
  label: PropTypes.any,
  sx: PropTypes.any,
  titleProps: PropTypes.any,
  captionProps: PropTypes.any,
};
