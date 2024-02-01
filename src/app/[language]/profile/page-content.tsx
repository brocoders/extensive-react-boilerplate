"use client";
import useAuth from "@/services/auth/use-auth";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Link from "@/components/link";
import { useTranslation } from "@/services/i18n/client";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
}));

function Profile() {
  const { user } = useAuth();
  const { t } = useTranslation("profile");
  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} wrap="nowrap" pt={3}>
        <Grid item xs="auto">
          <StyledAvatar
            alt={user?.firstName + " " + user?.lastName}
            data-testid="user-icon"
            src={user?.photo?.path}
          />
        </Grid>
        <Grid item>
          <Typography variant="h3" gutterBottom data-testid="user-name">
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="h5" gutterBottom data-testid="user-email">
            {user?.email}
          </Typography>
          <Grid container>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                LinkComponent={Link}
                href="/profile/edit"
                data-testid="edit-profile"
              >
                {t("profile:actions.edit")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(Profile);
