// @next
/* eslint-disable @typescript-eslint/no-explicit-any */
// @mui
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

// @project
import branding from "@/branding.json";
import SvgIcon from "@/components/SvgIcon";
import Typeset from "@/components/Typeset";
import { IconType } from "@/enum";

/***************************  FOLLOW US - DATA  ***************************/

const linkProps = { target: "_blank", rel: "noopener noreferrer" };
const socialIcons = [
  {
    icon: "tabler-filled-linkedin",
    link: { href: `${branding.company.socialLink.linkedin}`, ...linkProps },
  },
  {
    icon: "tabler-filled-facebook",
    link: { href: `${branding.company.socialLink.facebook}`, ...linkProps },
  },
  {
    icon: "tabler-filled-youtube",
    link: { href: `${branding.company.socialLink.youtube}`, ...linkProps },
  },
  {
    icon: "tabler-filled-brand-github",
    link: { href: `${branding.company.socialLink.github}`, ...linkProps },
  },
  {
    icon: "tabler-filled-dribble",
    link: { href: `${branding.company.socialLink.dribble}`, ...linkProps },
  },
];

/***************************  FOOTER - FOLLOW US  ***************************/

interface FollowUSProps {
  heading?: boolean | string;
  color?: string;
}

export default function FollowUS({ heading = true, color }: FollowUSProps) {
  return (
    <Stack
      sx={{
        alignItems: { xs: "center", md: "flex-start" },
        gap: 2,
        textAlign: { xs: "center", md: "left" },
      }}
    >
      {heading && (
        <Typeset
          {...{
            heading: typeof heading === "string" ? heading : "Follow Us on",
            headingProps: { variant: "h4" },
          }}
        />
      )}
      <Stack direction="row" sx={{ gap: { xs: 0.5, sm: 1.5 } }}>
        {socialIcons.map((item, index) => (
          <Link
            key={index}
            {...item.link}
            sx={{ WebkitTapHighlightColor: "transparent" }}
            rel="noopener noreferrer"
            aria-label="follow us on social media"
          >
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: color || "grey.200",
                width: { xs: 40, sm: 52, lg: 56 },
                height: { xs: 40, sm: 52, lg: 56 },
                borderRadius: 3,
                ":hover": { bgcolor: "grey.300" },
              }}
            >
              {/*   //TODO: Uncomment the SvgIcon component when the icon data is
              available */}
              <SvgIcon
                name={typeof item.icon === "string" ? item.icon : item.icon}
                type={IconType.FILL}
                {...(typeof item.icon === "object" ? item.icon : {})}
              />
            </Avatar>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
