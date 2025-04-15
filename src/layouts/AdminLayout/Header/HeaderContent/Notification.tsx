"use client";

import { Fragment, useState } from "react";

// @mui
import { keyframes, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// @project
import EmptyNotification from "@/components/header/empty-state/EmptyNotification";
import MainCard from "@/components/cards/MainCard";
import NotificationItem from "@/components/NotificationItem";
import SimpleBar from "@/components/third-party/SimpleBar";

// @assets
import NotificationsIcon from "@mui/icons-material/Notifications";
import CodeIcon from "@mui/icons-material/Code";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GitBranchIcon from "@mui/icons-material/CallSplit";
import NoteIcon from "@mui/icons-material/Note";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

declare module "@mui/material/styles" {
  interface Theme {
    customShadows: {
      tooltip: string;
    };
  }
  interface ThemeOptions {
    customShadows?: {
      tooltip?: string;
    };
  }
}

const swing = keyframes`
  20% {
    transform: rotate(15deg) scale(1);
}
40% {
    transform: rotate(-10deg) scale(1.05);
}
60% {
    transform: rotate(5deg) scale(1.1);
}
80% {
    transform: rotate(-5deg) scale(1.05);
}
100% {
    transform: rotate(0deg) scale(1);
}
`;

/***************************  HEADER - NOTIFICATION  ***************************/

export default function Notification() {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [innerAnchorEl, setInnerAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const [allRead, setAllRead] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  const open = Boolean(anchorEl);
  const innerOpen = Boolean(innerAnchorEl);
  const id = open ? "notification-action-popper" : undefined;
  const innerId = innerOpen ? "notification-inner-popper" : undefined;
  const buttonStyle = { borderRadius: 2, p: 1 };

  const listcontent = [
    "All notification",
    "Users",
    "Account",
    "Language",
    "Role & Permission",
    "Setting",
  ];

  const [notifications, setNotifications] = useState([
    {
      avatar: {
        alt: "Travis Howard",
        src: "/assets/images/users/avatar-1.png",
      },
      badge: (
        <CodeIcon sx={{ fontSize: 14, color: theme.palette.text.primary }} />
      ),
      title: "New Feature Deployed · Code Review Needed",
      subTitle: "Brenda Skiles",
      dateTime: "Jul 9",
    },
    {
      avatar: <GitBranchIcon />,
      title: 'New Branch Created - "feature-user-auth"',
      subTitle: "Michael Carter",
      dateTime: "Jul 10",
      isSeen: true,
    },
    {
      avatar: <GitBranchIcon />,
      title: 'Pull Request Opened "fix-dashboard-bug"',
      subTitle: "Sophia Green",
      dateTime: "Jul 11",
    },
    {
      avatar: {
        alt: "Travis Howard",
        src: "/assets/images/users/avatar-4.png",
      },
      badge: (
        <NoteIcon sx={{ fontSize: 14, color: theme.palette.text.primary }} />
      ),
      title: "Admin Approval · Document Submission Accepted",
      subTitle: "Salvatore Bogan",
      dateTime: "Jul 15",
      isSeen: true,
    },
    {
      avatar: <GpsFixedIcon />,
      title: "Location Access Request, Pending Your Approval",
      subTitle: "System Notification",
      dateTime: "Jul 24",
      isSeen: true,
    },
  ]);

  const [notifications2, setNotifications2] = useState([
    {
      avatar: {
        alt: "Travis Howard",
        src: "/assets/images/users/avatar-1.png",
      },
      badge: (
        <CodeIcon sx={{ fontSize: 14, color: theme.palette.text.primary }} />
      ),
      title: "Code Review Requested · Feature Deployment",
      subTitle: "Brenda Skiles",
      dateTime: "Jul 9",
    },
    {
      avatar: <GpsFixedIcon />,
      title: "Location Access Granted [Security Update]",
      subTitle: "System Notification",
      dateTime: "Jul 24",
      isSeen: true,
    },
    {
      avatar: { alt: "Alice Smith", src: "/assets/images/users/avatar-5.png" },
      badge: (
        <NoteIcon sx={{ fontSize: 14, color: theme.palette.text.primary }} />
      ),
      title: "Document Submission Approval Received",
      subTitle: "Salvatore Bogan",
      dateTime: "Aug 12",
      isSeen: true,
    },
    {
      avatar: {
        alt: "Travis Howard",
        src: "/assets/images/users/avatar-1.png",
      },
      badge: (
        <CodeIcon sx={{ fontSize: 14, color: theme.palette.text.primary }} />
      ),
      title: "New Commit Pushed · Review Changes",
      subTitle: "Brenda Skiles",
      dateTime: "Jul 9",
    },
    {
      avatar: <GpsFixedIcon />,
      title: "Unusual Login Attempt [Verify Activity]",
      subTitle: "Security Alert",
      dateTime: "Jul 24",
    },
  ]);

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleInnerActionClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setInnerAnchorEl(innerAnchorEl ? null : event.currentTarget);
  };

  // Function to mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        isSeen: true,
      }))
    );
    setNotifications2((prevNotifications2) =>
      prevNotifications2.map((notification) => ({
        ...notification,
        isSeen: true,
      }))
    );
    setAllRead(true);
  };

  const handleClearAll = () => {
    setNotifications([]);
    setNotifications2([]);
    setShowEmpty(true); // Set empty state to true when cleared
  };

  return (
    <>
      <IconButton
        color="secondary"
        size="small"
        onClick={handleActionClick}
        aria-label="show notifications"
        {...(notifications.length !== 0 &&
          !allRead && {
            sx: { "& svg": { animation: `${swing} 1s ease infinite` } },
          })}
      >
        <Badge
          color="error"
          variant="dot"
          invisible={allRead || notifications.length === 0}
          sx={{
            "& .MuiBadge-badge": {
              height: 6,
              minWidth: 6,
              top: 4,
              right: 4,
              border: `1px solid ${theme.palette.background.default}`,
            },
          }}
        >
          <NotificationsIcon fontSize="small" />
        </Badge>
      </IconButton>
      <Popper
        placement="bottom-end"
        id={id}
        open={open}
        anchorEl={anchorEl}
        popperOptions={{
          modifiers: [
            { name: "offset", options: { offset: [downSM ? 45 : 0, 8] } },
          ],
        }}
        transition
      >
        {({ TransitionProps }) => (
          <Fade in={open} {...TransitionProps}>
            <MainCard
              sx={{
                borderRadius: 2,
                boxShadow: theme.customShadows.tooltip,
                width: 1,
                minWidth: { xs: 352, sm: 240 },
                maxWidth: { xs: 352, md: 420 },
                p: 0,
              }}
            >
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <Box>
                  <CardHeader
                    sx={{ p: 1 }}
                    title={
                      <Stack
                        direction="row"
                        sx={{ gap: 1, justifyContent: "space-between" }}
                      >
                        <Button
                          color="secondary"
                          size="small"
                          sx={{ typography: "h6" }}
                          endIcon={<ExpandMoreIcon fontSize="small" />}
                          onClick={handleInnerActionClick}
                        >
                          All Notification
                        </Button>
                        <Popper
                          placement="bottom-start"
                          id={innerId}
                          open={innerOpen}
                          anchorEl={innerAnchorEl}
                          transition
                          popperOptions={{
                            modifiers: [
                              {
                                name: "preventOverflow",
                                options: { boundary: "clippingParents" },
                              },
                            ],
                          }}
                        >
                          {({ TransitionProps }) => (
                            <Fade in={innerOpen} {...TransitionProps}>
                              <MainCard
                                sx={{
                                  borderRadius: 2,
                                  boxShadow: theme.customShadows.tooltip,
                                  minWidth: 156,
                                  p: 0.5,
                                }}
                              >
                                <ClickAwayListener
                                  onClickAway={() => setInnerAnchorEl(null)}
                                >
                                  <List disablePadding>
                                    {listcontent.map((item, index) => (
                                      <ListItemButton
                                        key={index}
                                        sx={buttonStyle}
                                        component="button"
                                        onClick={handleInnerActionClick}
                                      >
                                        <ListItemText>{item}</ListItemText>
                                      </ListItemButton>
                                    ))}
                                  </List>
                                </ClickAwayListener>
                              </MainCard>
                            </Fade>
                          )}
                        </Popper>
                        {!showEmpty && (
                          <Button
                            color="primary"
                            size="small"
                            onClick={handleMarkAllAsRead}
                            disabled={allRead}
                          >
                            Mark All as Read
                          </Button>
                        )}
                      </Stack>
                    }
                  />
                  {showEmpty ? (
                    <EmptyNotification />
                  ) : (
                    <Fragment>
                      <CardContent
                        sx={{ px: 0.5, py: 2, "&:last-child": { pb: 2 } }}
                      >
                        <SimpleBar sx={{ maxHeight: 405, height: 1 }}>
                          <List disablePadding>
                            <ListSubheader
                              disableSticky
                              sx={{
                                color: "text.disabled",
                                typography: "caption",
                                py: 0.5,
                                px: 1,
                                mb: 0.5,
                              }}
                            >
                              Last 7 Days
                            </ListSubheader>
                            {notifications.map((notification, index) => (
                              <ListItemButton key={index} sx={buttonStyle}>
                                <NotificationItem
                                  avatar={notification.avatar}
                                  {...(notification.badge && {
                                    badgeAvatar: {
                                      children: notification.badge,
                                    },
                                  })}
                                  title={notification.title}
                                  subTitle={notification.subTitle}
                                  dateTime={notification.dateTime}
                                  isSeen={notification.isSeen}
                                />
                              </ListItemButton>
                            ))}
                            <ListSubheader
                              disableSticky
                              sx={{
                                color: "text.disabled",
                                typography: "caption",
                                py: 0.5,
                                px: 1,
                                mb: 0.5,
                                mt: 1.5,
                              }}
                            >
                              Older
                            </ListSubheader>
                            {notifications2.map((notification, index) => (
                              <ListItemButton key={index} sx={buttonStyle}>
                                <NotificationItem
                                  avatar={notification.avatar}
                                  {...(notification.badge && {
                                    badgeAvatar: {
                                      children: notification.badge,
                                    },
                                  })}
                                  title={notification.title}
                                  subTitle={notification.subTitle}
                                  dateTime={notification.dateTime}
                                  isSeen={notification.isSeen}
                                />
                              </ListItemButton>
                            ))}
                          </List>
                        </SimpleBar>
                      </CardContent>
                      <CardActions sx={{ p: 1 }}>
                        <Button
                          fullWidth
                          color="error"
                          onClick={handleClearAll}
                        >
                          Clear all
                        </Button>
                      </CardActions>
                    </Fragment>
                  )}
                </Box>
              </ClickAwayListener>
            </MainCard>
          </Fade>
        )}
      </Popper>
    </>
  );
}
