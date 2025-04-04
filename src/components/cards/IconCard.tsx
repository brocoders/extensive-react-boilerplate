import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// @project
import GraphicsCard from "@/components/cards/GraphicsCard";
import SvgIcon from "@/components/SvgIcon";

// @types

/***************************  COMMON - ICON CARD  ***************************/

export default function IconCard({
  icon,
  title,
  content,
  iconAvatar,
  contentCard,
  titleProps,
  stackProps,
  contentProps,
  cardPadding,
}: {
  icon: string | object;
  title: string;
  content: string;
  iconAvatar?: boolean | string;
  contentCard?: boolean | string;
  titleProps?: object;
  stackProps?: object;
  contentProps?: object;
  cardPadding?: object;
}) {
  const defaultBoxPadding = { xs: 3, sm: 4, md: 5 };
  const boxPadding = cardPadding ? { ...cardPadding } : defaultBoxPadding;

  return (
    <GraphicsCard sx={{ height: 1 }}>
      <Stack
        sx={{ gap: iconAvatar || contentCard ? 2.5 : 2, height: 1 }}
        {...(stackProps && { ...stackProps })}
      >
        <Box sx={{ px: boxPadding, pt: boxPadding, lineHeight: 0 }}>
          {iconAvatar ? (
            <Avatar
              sx={{
                width: 60,
                height: 60,
                bgcolor:
                  typeof iconAvatar === "boolean" ? "grey.300" : iconAvatar,
              }}
            >
              <SvgIcon
                {...(typeof icon === "string" ? { name: icon } : { ...icon })}
              />
            </Avatar>
          ) : (
            <Box>
              <SvgIcon
                {...(typeof icon === "string" ? { name: icon } : { ...icon })}
                size={40}
              />
            </Box>
          )}
        </Box>
        <GraphicsCard
          sx={{
            p: boxPadding,
            height: 1,
            ...(contentCard && {
              bgcolor:
                typeof contentCard === "boolean" ? "grey.200" : contentCard,
            }),
          }}
        >
          <Stack sx={{ gap: { xs: 1, sm: 1.5 } }}>
            {title && (
              <Typography variant="h4" {...(titleProps && { ...titleProps })}>
                {title}
              </Typography>
            )}
            {content && (
              <Typography
                {...(contentProps && { ...contentProps })}
                sx={{ color: "text.secondary" }}
              >
                {content}
              </Typography>
            )}
          </Stack>
        </GraphicsCard>
      </Stack>
    </GraphicsCard>
  );
}
