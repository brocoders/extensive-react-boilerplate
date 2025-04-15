// @mui
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// @project
import LogoSection from "@/components/logo";
import MainCard from "@/components/cards/MainCard";
import { AvatarSize } from "@/enum";

// @mui/icons-material
import BoltIcon from "@mui/icons-material/Bolt";
import Link from "@mui/material/Link";

/***************************  NAVIGATION CARD - DATA  ***************************/

const data = {
  title: "Upgrade Your Experience",
  description:
    "Take your experience to the next level with our premium offering. Buy now and enjoy more!",
  icon: <BoltIcon fontSize="small" />,
};

/***************************  NAVIGATION CARD - CONTENT  ***************************/

interface CardContentProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function CardContent({ title, description, icon }: CardContentProps) {
  return (
    <Stack sx={{ gap: 3 }}>
      <Stack direction="row" sx={{ gap: 0.25, alignItems: "center" }}>
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: "transparent",
            width: AvatarSize.XS,
            height: AvatarSize.XS,
          }}
        >
          <LogoSection
            isIcon
            sx={{ "& .MuiBox-root": { width: "auto", height: "auto" } }}
          />
        </Avatar>
        <Typography variant="body2">
          {process.env.NEXT_PUBLIC_VERSION}
        </Typography>
      </Stack>
      <Stack sx={{ gap: 1, alignItems: "flex-start", textWrap: "wrap" }}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
        <Button
          startIcon={icon}
          variant="contained"
          component={Link}
          href="https://mui.com/store/items/saasable-multipurpose-ui-kit-and-dashboard/"
          target="_blank"
          sx={{ mt: 0.5 }}
        >
          Buy Now
        </Button>
      </Stack>
    </Stack>
  );
}

/***************************  DRAWER CONTENT - NAVIGATION CARD  ***************************/

export default function NavCard() {
  return (
    <MainCard sx={{ p: 1.5, bgcolor: "grey.50", boxShadow: "none", mb: 3 }}>
      <CardContent
        title={data.title}
        description={data.description}
        icon={data.icon}
      />
    </MainCard>
  );
}
