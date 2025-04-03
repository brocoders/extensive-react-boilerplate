function path(urlChunks: string[]): string {
  return urlChunks.join("/");
}

export const SECTION_PATH = "/sections";
export const ADMIN_PATH = "";
export const DOCS_URL = "";
const AUTH_PATH = "auth";

export const PAGE_PATH = {
  // auth pages path
  login: path([SECTION_PATH, AUTH_PATH, "login"]),
  forgotPassword: path([SECTION_PATH, AUTH_PATH, "forgot-password"]),
  newPassword: path([SECTION_PATH, AUTH_PATH, "new-password"]),
  otpVerification: path([SECTION_PATH, AUTH_PATH, "otp-verification"]),
  register: path([SECTION_PATH, AUTH_PATH, "register"]),

  about: path([SECTION_PATH, "about"]),
  blog: path([SECTION_PATH, "blog"]),
  clientele: path([SECTION_PATH, "clientele"]),
  contactUs: path([SECTION_PATH, "contact-us"]),
  cookie: path([SECTION_PATH, "cookie"]),
  cta: path([SECTION_PATH, "cta"]),
  earlyAccess: path([SECTION_PATH, "early-access"]),
  process: path([SECTION_PATH, "process"]),
  privacyPolicy: path([SECTION_PATH, "privacy-policy"]),
  team: path([SECTION_PATH, "team"]),
  testimonial: path([SECTION_PATH, "testimonial"]),
  termsCondition: path([SECTION_PATH, "terms-condition"]),
  underMaintenance: path([SECTION_PATH, "under-maintenance"]),

  // pages path
  aboutPage: "/about",
  careerPage: "/career",
  contactPage: "/contact",
  faqPage: "/faq",
  pricingPage: "/pricing",
  privacyPolicyPage: "/privacy-policy",
  termsConditionPage: "/terms-condition",
};
