import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MuiLink from "@mui/material/Link";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "privacy-policy");

  return {
    title: t("title"),
  };
}

async function PrivacyPolicy({ params }: Props) {
  const { t } = await getServerTranslation(params.language, "privacy-policy");

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography
        variant="h2"
        component="h1"
        data-testid="privacy-policy-title"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        {t("title")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("lastUpdated")}
      </Typography>
      <Typography
        data-testid="privacy-policy-description"
        gutterBottom
        paragraph
      >
        {t("description1")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("description2")}
      </Typography>
      <Typography
        component="h2"
        variant="h3"
        letterSpacing="-0.02em"
        gutterBottom
        sx={{ mt: 7 }}
      >
        {t("interpretation_and_definitions")}
      </Typography>
      <Typography component="h3" variant="h4" gutterBottom sx={{ mt: 5 }}>
        {t("interpretation")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("interpretation_description")}
      </Typography>
      <Typography component="h3" variant="h4" gutterBottom sx={{ mt: 5 }}>
        {t("definitions")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("definitions_description")}
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 5, mb: 6 }}>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("account_title")}</strong>
          {t("account_description")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("affiliate_title")}</strong>
          {t("affiliate_description")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("company_title")}</strong>
          {t("company_description")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("cookies_title")}</strong>
          {t("cookies_definition")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("device_title")}</strong>
          {t("device_description")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("personal_data_title")}</strong>
          {t("personal_data_definition")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("service_title")}</strong>
          {t("service_description")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("service_provider_title")}</strong>
          {t("service_provider_description")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("usage_data_title")}</strong>
          {t("usage_data_description")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("website_title")}</strong>
          {t("website_description")}
          <MuiLink
            target="_blank"
            rel="external noopener noreferrer"
            href="https://react-boilerplate-coral.vercel.app/"
          >
            https://react-boilerplate-coral.vercel.app
          </MuiLink>
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("you_title")}</strong>
          {t("you_description")}
        </ListItem>
      </List>
      <Typography
        component="h2"
        variant="h3"
        gutterBottom
        letterSpacing="-0.02em"
      >
        {t("collecting_and_using_personal_data")}
      </Typography>
      <Typography
        component="h3"
        variant="h4"
        sx={{
          my: 5,
        }}
      >
        {t("types_of_data_collected")}
      </Typography>
      <Typography component="h4" variant="h5" gutterBottom>
        {t("personal_data")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("personal_data_description")}
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 5, mb: 3 }}>
        <ListItem sx={{ display: "list-item" }}>{t("usage_data")}</ListItem>
      </List>
      <Typography component="h4" variant="h5" gutterBottom>
        {t("usage_data")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("usage_data_auto_collected")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("mobile_device_info_collection")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("browser_info_collection")}
      </Typography>
      <Typography component="h4" variant="h5" gutterBottom sx={{ mt: 5 }}>
        {t("tracking_technologies_and_cookies")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("tracking_technologies_and_cookies_description")}
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 5 }}>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("cookies_or_browser_cookies")}</strong>{" "}
          {t("cookies_description")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("web_beacons")}</strong> {t("web_beacons_description")}
        </ListItem>
      </List>
      <Typography gutterBottom paragraph>
        {t("cookies_paragraph")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("purpose_of_cookies")}
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 5 }}>
        <ListItem sx={{ display: "list-item" }}>
          <Typography gutterBottom paragraph sx={{ fontWeight: "bold" }}>
            {t("necessary_cookies_title")}
          </Typography>
          <Typography gutterBottom paragraph>
            {t("session_cookies")}
          </Typography>
          <Typography gutterBottom paragraph>
            {t("administered_by")}
          </Typography>
          <Typography gutterBottom paragraph>
            {t("necessary_cookies_purpose")}
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <Typography gutterBottom paragraph sx={{ fontWeight: "bold" }}>
            {t("cookies_policy_title")}
          </Typography>
          <Typography gutterBottom paragraph>
            {t("persistent_cookies")}
          </Typography>
          <Typography gutterBottom paragraph>
            {t("administered_by")}
          </Typography>
          <Typography gutterBottom paragraph>
            {t("cookies_policy_purpose")}
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <Typography gutterBottom paragraph sx={{ fontWeight: "bold" }}>
            {t("functionality_cookies_title")}
          </Typography>
          <Typography gutterBottom paragraph>
            {t("persistent_cookies")}
          </Typography>
          <Typography gutterBottom paragraph>
            {t("administered_by")}
          </Typography>
          <Typography gutterBottom paragraph>
            {t("functionality_cookies_purpose")}
          </Typography>
        </ListItem>
      </List>
      <Typography gutterBottom paragraph>
        {t("cookies_policy_info")}
      </Typography>
      <Typography
        component="h3"
        variant="h4"
        gutterBottom
        sx={{
          my: 5,
        }}
      >
        {t("use_of_personal_data")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("personal_data_purposes")}
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 5 }}>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("provide_and_maintain_service")}</strong>{" "}
          {t("provide_and_maintain_service_desc")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("manage_account")}</strong> {t("manage_account_desc")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("performance_of_contract")}</strong>{" "}
          {t("performance_of_contract_desc")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("contact_you")}</strong> {t("contact_you_desc")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("provide_news_and_offers")}</strong>{" "}
          {t("provide_news_and_offers_desc")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("manage_requests")}</strong> {t("manage_requests_desc")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("business_transfers")}</strong>{" "}
          {t("business_transfers_desc")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("other_purposes")}</strong> {t("other_purposes_desc")}
        </ListItem>
      </List>
      <Typography gutterBottom paragraph>
        {t("personal_data_sharing")}
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 5 }}>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("with_service_providers")}</strong>{" "}
          {t("with_service_providers_desc")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("for_business_transfers")}</strong>{" "}
          {t("for_business_transfers_desc")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("with_affiliates")}</strong> {t("with_affiliates_desc")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("with_business_partners")}</strong>{" "}
          {t("with_business_partners_desc")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("with_other_users")}</strong> {t("with_other_users_desc")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <strong>{t("with_consent")}</strong> {t("with_consent_desc")}
        </ListItem>
      </List>
      <Typography
        component="h3"
        variant="h4"
        gutterBottom
        sx={{
          my: 5,
        }}
      >
        {t("retention_of_personal_data")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("retention_policy_paragraph1")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("retention_policy_paragraph2")}
      </Typography>

      <Typography
        component="h3"
        variant="h4"
        gutterBottom
        sx={{
          my: 5,
        }}
      >
        {t("transfer_of_personal_data")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("transfer_info_paragraph1")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("transfer_info_paragraph2")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("transfer_info_paragraph3")}
      </Typography>

      <Typography
        component="h3"
        variant="h4"
        gutterBottom
        sx={{
          my: 5,
        }}
      >
        {t("delete_personal_data")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("delete_info_paragraph1")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("delete_info_paragraph2")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("delete_info_paragraph3")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("delete_info_paragraph4")}
      </Typography>

      <Typography
        component="h3"
        variant="h4"
        gutterBottom
        sx={{
          my: 5,
        }}
      >
        {t("disclosure_of_personal_data")}
      </Typography>
      <Typography component="h4" variant="h5" gutterBottom>
        {t("business_transactions")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("business_transactions_paragraph")}
      </Typography>

      <Typography component="h4" variant="h5" gutterBottom sx={{ mt: 5 }}>
        {t("law_enforcement")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("law_enforcement_paragraph")}
      </Typography>

      <Typography component="h4" variant="h5" gutterBottom sx={{ mt: 5 }}>
        {t("other_legal_requirements")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("other_legal_requirements_paragraph")}
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 5 }}>
        <ListItem sx={{ display: "list-item" }}>
          {t("legal_requirement_item1")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          {t("legal_requirement_item2")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          {t("legal_requirement_item3")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          {t("legal_requirement_item4")}
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          {t("legal_requirement_item5")}
        </ListItem>
      </List>

      <Typography
        component="h3"
        variant="h4"
        gutterBottom
        sx={{
          my: 5,
        }}
      >
        {t("security_of_personal_data")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("security_paragraph")}
      </Typography>

      <Typography
        component="h2"
        variant="h3"
        letterSpacing="-0.02em"
        gutterBottom
        sx={{
          mt: 7,
          mb: 5,
        }}
      >
        {t("childrens_privacy")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("childrens_privacy_paragraph1")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("childrens_privacy_paragraph2")}
      </Typography>

      <Typography
        component="h2"
        variant="h3"
        letterSpacing="-0.02em"
        gutterBottom
        sx={{
          mt: 7,
          mb: 5,
        }}
      >
        {t("links_to_other_websites")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("links_to_other_websites_paragraph1")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("links_to_other_websites_paragraph2")}
      </Typography>

      <Typography
        component="h2"
        variant="h3"
        letterSpacing="-0.02em"
        gutterBottom
        sx={{
          mt: 7,
          mb: 5,
        }}
      >
        {t("changes_to_privacy_policy")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("changes_to_privacy_policy_paragraph1")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("changes_to_privacy_policy_paragraph2")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("changes_to_privacy_policy_paragraph3")}
      </Typography>

      <Typography
        component="h2"
        variant="h3"
        letterSpacing="-0.02em"
        gutterBottom
        sx={{
          mt: 7,
          mb: 5,
        }}
      >
        {t("contact_us")}
      </Typography>
      <Typography gutterBottom paragraph>
        {t("contact_us_paragraph")}
      </Typography>

      <List sx={{ listStyleType: "disc", pl: 5 }}>
        <ListItem sx={{ display: "list-item" }}>
          {t("contact_us_by_email")}{" "}
          <MuiLink
            target="_blank"
            rel="external noopener noreferrer"
            href="mailto:boilerplates@brocoders.com"
          >
            boilerplates@brocoders.com
          </MuiLink>
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          {t("contact_us_on_website")}{" "}
          <MuiLink
            target="_blank"
            rel="external noopener noreferrer"
            href="https://bcboilerplates.com/"
          >
            bc boilerplates
          </MuiLink>
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          {t("contact_us_on_github_discussions")}{" "}
          <MuiLink
            target="_blank"
            rel="external noopener noreferrer"
            href="https://github.com/brocoders/nestjs-boilerplate/discussions"
          >
            nestjs-boilerplate
          </MuiLink>{" "}
          {t("contact_us_on_github_discussions_or")}{" "}
          <MuiLink
            target="_blank"
            rel="external noopener noreferrer"
            href="https://github.com/brocoders/extensive-react-boilerplate/discussions"
          >
            extensive-react-boilerplate
          </MuiLink>
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          {t("contact_us_on_discord")}{" "}
          <MuiLink
            target="_blank"
            rel="external noopener noreferrer"
            href="https://discord.com/channels/520622812742811698/1197293125434093701"
          >
            channel
          </MuiLink>
        </ListItem>
      </List>
    </Container>
  );
}
export default PrivacyPolicy;
