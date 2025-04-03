import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://your-keycloak-server/auth",
  realm: "your-realm",
  clientId: "your-client-id",
});

export default keycloak;
