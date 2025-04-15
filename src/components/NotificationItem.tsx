"use client";

import { isValidElement } from "react";

// @mui
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// @project
import { AvatarSize } from "@/enum";

/***************************  NOTIFICATION - LIST  ***************************/

interface NotificationItemProps {
  avatar: React.ReactNode | Record<string, any>;
  badgeAvatar?: Record<string, any>;
  title: string;
  subTitle?: string;
  dateTime?: string;
  isSeen?: boolean;
}

export default function NotificationItem({
  avatar,
  badgeAvatar,
  title,
  subTitle,
  dateTime,
  isSeen = false,
}: NotificationItemProps) {
  const theme = useTheme();
  const ellipsis = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  };

  const avatarContent = isValidElement(avatar) ? (
    <Avatar>{avatar}</Avatar>
  ) : (
    <Avatar {...(avatar as Record<string, any>)} />
  );

  return (
    <Stack
      direction="row"
      sx={{
        width: 1,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", gap: 1.25, flexShrink: 0 }}
      >
        {badgeAvatar ? (
          // Box component for badge position due to parent Stack component
          <Box>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Avatar
                  sx={{
                    width: AvatarSize.BADGE,
                    height: AvatarSize.BADGE,
                    border: `1px solid ${theme.palette.common.white}`,
                  }}
                  {...badgeAvatar}
                />
              }
              sx={{ "& .MuiBadge-badge": { bottom: "22%" } }}
            >
              {avatarContent}
            </Badge>
          </Box>
        ) : (
          avatarContent
        )}
      </Stack>
      {/* minWidth: 0 -> Critical to ensure ellipsis works */}
      <Stack sx={{ flexGrow: 1, minWidth: 0, maxWidth: 1, gap: 0.25 }}>
        <Typography
          variant={isSeen ? "body2" : "subtitle2"}
          {...(isSeen && { color: "grey.700" })}
          noWrap
          sx={ellipsis}
        >
          {title}
        </Typography>
        {subTitle && (
          <Typography
            variant="caption"
            color="text.secondary"
            noWrap
            sx={ellipsis}
          >
            {subTitle}
          </Typography>
        )}
      </Stack>
      {dateTime && (
        <Typography
          variant="caption"
          sx={{ marginLeft: "auto", flexShrink: 0 }}
          {...(isSeen && { color: "grey.700" })}
        >
          {dateTime}
        </Typography>
      )}
    </Stack>
  );
}

NotificationItem.propTypes = {
  avatar: PropTypes.any,
  badgeAvatar: PropTypes.any,
  title: PropTypes.any,
  subTitle: PropTypes.any,
  dateTime: PropTypes.any,
  isSeen: PropTypes.bool,
};
