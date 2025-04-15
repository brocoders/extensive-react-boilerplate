"use client";
import type { Metadata } from "next";
import { getServerTranslation } from "@/services/i18n";
import Grid from "@mui/material/Grid";
import ContainerWrapper from "@/components/ContainerWrapper";
import Hero from "@/components/hero/Hero";
import Stack from "@mui/material/Stack";
import { Benefit } from "@/components/benefit";
import Feature18 from "@/components/feature/Feature18";
import Feature21 from "@/components/feature/Feature21";
import { Cta4, Cta5 } from "@/components/cta";
import { DynamicComponentType } from "@/enum";
import { Clientele3 } from "@/components/clientele";
import Faq6 from "@/components/faq/Faq6"; // Adjust the path based on your project structure

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
  };
}
import branding from "@/branding.json";
import Typography from "@mui/material/Typography";
// import Link from "next/link";
import { Footer7 } from "@/components/footer";
// @asssets
// const imagePrefix = "/assets/images/presentation";

function DescriptionLine() {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Want to contribute? Our community is here to help. Learn more about{" "}
      {/* <Link href={branding.company.socialLink.discord} passHref>
        <MuiLink
          variant="caption"
          color="primary"
          component="a"
          underline="hover"
        >
          Join our journey!
        </MuiLink>
      </Link> */}
    </Typography>
  );
}

export default async function Home(/* props: Props */) {
  // const params = await props.params;
  // const { t } = await getServerTranslation(params.language, "home");

  const linkProps = { target: "_blank", rel: "noopener noreferrer" };
  const hero = {
    headLine: "Powering Waste Collectors, Cleaning Up Communities",
    captionLine:
      "Kata gives waste collectors and community groups the tools to streamline operations, track payments, and scale sustainably—because waste management shouldn’t be messy",
    primaryBtn: {
      children: "Download the App (For Garbage Collectors)",
      href: "",
    },
    videoSrc:
      "https://www.youtube.com/embed/JrhLKkqwZ5s" /* "https://d2elhhoq00m1pj.cloudfront.net/saasable-intro.mp4" */,
    videoThumbnail: "/assets/videos/thumbnails/intro-thumbnail.png",
    listData: [],
  };

  const benefit = {
    heading: "What We’ve Built (So Far!)",
    caption: "",
    blockDetail: [
      {
        animationDelay: 0.1,
        counter: "Smart Payment Tracking",
        defaultUnit: "+",
        caption: "No more cash disputes. Stay organized, get paid.",
      },
      {
        animationDelay: 0.2,
        counter: "Automated Reports",
        defaultUnit: "+",
        caption: "Transparency that builds trust and wins contracts.",
      },
      {
        animationDelay: 0.2,
        counter: "Community Engagement",
        defaultUnit: "+",
        caption: "Empower communities to take charge of their waste.",
      },
      {
        animationDelay: 0.2,
        counter: "Data-Driven Insights",
        defaultUnit: "+",
        caption: "Make informed decisions with real-time data.",
      },
    ],
  };

  // const tags = {
  //   heading: `Blocks `,
  //   description:
  //     "Explore a wide range of ready-made blocks—from Hero to CTA, Features, and more to speed up your design process.",
  //   primaryBtn: { children: "Explore all Blocks", href: "" },
  //   sections: [
  //     {
  //       animationDelay: 0.2,
  //       title: "Hero",
  //       subTitle: "17 Different Variants",
  //       image: `${imagePrefix}/hero-light.svg`,
  //       link: "/",
  //     },
  //     {
  //       animationDelay: 0.3,
  //       title: "Call to Action",
  //       subTitle: "12 Different Variants",
  //       image: `${imagePrefix}/cta-light.svg`,
  //       link: "/",
  //     },
  //     {
  //       animationDelay: 0.4,
  //       title: "Feature",
  //       subTitle: "23 Different Variants",
  //       image: `${imagePrefix}/feature-light.svg`,
  //       link: "/",
  //     },
  //     {
  //       animationDelay: 0.2,
  //       title: "Benefits",
  //       subTitle: "9 Different Variants",
  //       image: `${imagePrefix}/benefits-light.svg`,
  //       link: "/",
  //     },
  //     {
  //       animationDelay: 0.3,
  //       title: "Process",
  //       subTitle: "7 Different Variants",
  //       image: `${imagePrefix}/process-light.svg`,
  //       link: "/",
  //     },
  //     {
  //       animationDelay: 0.4,
  //       title: "Integration",
  //       subTitle: "8 Different Variants",
  //       image: `${imagePrefix}/integration-light.svg`,
  //       link: "/",
  //     },
  //   ],
  // };
  const feature18 = {
    heading: "What’s Next? Buckle Up.",
    caption:
      "We’re on a mission to revolutionize waste management. Join us as we build a platform that empowers waste collectors and communities.",
    topics: [
      {
        icon: "tabler-sparkles",
        title: "Recycling Marketplace",
        title2: "Connecting Waste Collectors with Buyers",
        description:
          "A platform to connect waste collectors with buyers for recycling materials.",
        image: "/assets/images/graphics/default/admin-dashboard.png",
        list: [
          { primary: "" },
          { primary: "" },
          { primary: "" },
          { primary: "" },
        ],
        actionBtn: { children: "Start Now", href: "/", ...linkProps },
        actionBtn2: { children: "More info", href: "/", ...linkProps },
      },
      {
        icon: "tabler-palette",
        title: "Household Signups",
        title2: "Streamlined Registration",
        description:
          "A user-friendly interface for households to sign up for waste collection services.",
        image: "/assets/images/graphics/default/admin-dashboard-2.png",
        list: [
          { primary: "" },
          { primary: "" },
          { primary: "" },
          { primary: "" },
        ],
        actionBtn: { children: "Start Now", href: "/", ...linkProps },
        actionBtn2: { children: "More info", href: "/", ...linkProps },
      },
      {
        icon: "tabler-rocket",
        title: "Carbon Credit Tracking",
        title2: "Track Your Impact",
        description:
          "A feature to track and manage carbon credits earned through recycling efforts.",
        image: "/assets/images/graphics/default/admin-dashboard-3.png",
        list: [
          { primary: "" },
          { primary: "" },
          { primary: "" },
          { primary: "" },
        ],
        actionBtn: { children: "Start Now", href: "/", ...linkProps },
        actionBtn2: { children: "More info", href: "/", ...linkProps },
      },
    ],
  };
  const feature21 = {
    heading: `For Waste Collectors & Community Game Changers`,
    caption:
      "SakaTata is designed for waste collectors and community groups. We’re building a platform that empowers you to streamline operations, track payments, and scale sustainably.",
    image: "/assets/images/graphics/ai/desktop1-light.svg",
    primaryBtn: {
      children: "Find out more",
      href: "",
      ...linkProps,
    },
    secondaryBtn: {
      children: "Start Now",
      href: "",
      ...linkProps,
    },
    features: [
      {
        animationDelay: 0.1,
        icon: "tabler-components",
        title: "Payments Made Simple",
      },
    ],
  };
  const cta4 = {
    headLine: "Why Choose Us?",
    primaryBtn: {
      children: "Read Our story",
      href: "/",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    profileGroups: {
      avatarGroups: [
        { avatar: "/assets/images/user/avatar1.png" },
        { avatar: "/assets/images/user/avatar2.png" },
        { avatar: "/assets/images/user/avatar3.png" },
        { avatar: "/assets/images/user/avatar4.png" },
        { avatar: "/assets/images/user/avatar5.png" },
        { avatar: "/assets/images/user/avatar6.png" },
      ],
      review:
        "We’re Kenyan-born and built to turn waste chaos into opportunity—for collectors, communities, and the planet.",
    },
    list: [
      { primary: "10+ Years Expertise" },
      { primary: "8k+ Satisfied Customers" },
      { primary: "Elite Envato Author" },
      { primary: "Timely Support, Guaranteed" },
      { primary: "Regular Updates Provided" },
      { primary: "Proven Industry Leader" },
    ],
    clientContent: "Join our journey!",
  };
  const clientele = {
    title: "SakaTata is Trusted by Leading Brands",
    clienteleList: [
      {
        image: {
          component: "clientele/Dribbble",
          type: DynamicComponentType.IMAGE,
        },
      },
      {
        image: {
          component: "clientele/Reddit",
          type: DynamicComponentType.IMAGE,
        },
      },
      {
        image: { component: "clientele/Mui", type: DynamicComponentType.IMAGE },
      },
      {
        image: {
          component: "clientele/Devto",
          type: DynamicComponentType.IMAGE,
        },
      },
      {
        image: {
          component: "clientele/Envato",
          type: DynamicComponentType.IMAGE,
        },
      },
    ],
  };
  const cta5 = {
    label: "About Us",
    heading: "We’re on a mission to revolutionize waste management.",
    caption: "",
    primaryBtn: {
      children: "Join our journey!",
      href: branding.company.socialLink.discord,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    description: <DescriptionLine />,
    saleData: {
      count: 8,
      defaultUnit: "+",
      caption: "Onboarded Waste Collectors",
    },
    profileGroups: {
      avatarGroups: [
        { avatar: "/assets/images/user/avatar5.png" },
        { avatar: "/assets/images/user/avatar2.png" },
        { avatar: "/assets/images/user/avatar3.png" },
        { avatar: "/assets/images/user/avatar4.png" },
        { avatar: "/assets/images/user/avatar6.png" },
        { avatar: "/assets/images/user/avatar1.png" },
      ],
      review:
        "We’re Kenyan-born and built to turn waste chaos into opportunity—for collectors, communities, and the planet.",
    },
  };

  const faq = {
    heading: "Frequently Asked Questions",
    caption:
      "Answers to common queries about our Waste Collection & Recycling Management System.",
    defaultExpanded: "Multi-Tenant Architecture",
    faqList: [
      {
        question: "What types of organizations can use this platform?",
        answer: `The system is built to support a wide range of users including Community Groups, Waste Management Companies, and Recycling Companies. Whether you're a small local group or a large-scale waste handler, the platform is built to scale and serve your specific needs.`,
        category: "General",
      },
      {
        question: "How does the multi-tenant architecture work?",
        answer: {
          content: `Each tenant operates in isolation with fully separate data and configuration.`,
          type: "list",
          data: [
            { primary: "Dedicated schema for each tenant." },
            {
              primary:
                "Individual settings like tax rates, waste categories, and branding.",
            },
            { primary: "Super Admin manages and oversees tenant activity." },
          ],
        },
        category: "Multi-Tenant Architecture",
      },
      {
        question: "Can tenants customize their environment?",
        answer: `Yes, tenants can customize billing cycles, waste categories, branding (logo, color, templates), and compliance settings. This allows the platform to adapt to various operational models.`,
        category: "Multi-Tenant Architecture",
      },
      {
        question: "What roles are available in the system?",
        answer: {
          content:
            "The system supports role-based access control with the following user types:",
          type: "list",
          data: [
            { primary: "Super Admin" },
            { primary: "Waste Management Company Admin" },
            { primary: "Community Group Admin" },
            { primary: "Recycling Company Admin" },
            { primary: "Agent" },
            { primary: "Customer" },
          ],
        },
        category: "User & Role Management",
      },
      {
        question: "Can a user have multiple roles?",
        answer: `Yes, the system supports multiple roles per user. For example, an agent can also be a customer. Access and permissions adjust accordingly.`,
        category: "User & Role Management",
      },
      {
        question: "How is waste collection managed?",
        answer: {
          content: "Collection is structured around regions and residences.",
          type: "list",
          data: [
            { primary: "Residences are assigned to regions." },
            { primary: "Agents manage collections per region." },
            {
              primary:
                "Supports ad-hoc and periodic (weekly/monthly) collection.",
            },
            { primary: "Route optimization is available." },
          ],
        },
        category: "Waste Collection",
      },
      {
        question: "Is the accounting system compliant with standards?",
        answer: {
          content:
            "Yes, it features double-entry accounting aligned with IFRS 9 standards.",
          type: "list",
          data: [
            { primary: "Debits and credits for every transaction." },
            {
              primary:
                "Chart of Accounts with assets, liabilities, revenue, and expenses.",
            },
            {
              primary:
                "Integrated financial reports: P&L, Balance Sheet, Cash Flow.",
            },
          ],
        },
        category: "Payments & Accounting",
      },
      {
        question: "What payment methods are supported?",
        answer: {
          content: "The platform integrates with multiple payment gateways.",
          type: "list",
          data: [
            { primary: "Mobile Money (e.g., M-Pesa)" },
            { primary: "Bank Transfers" },
            { primary: "Credit/Debit Cards" },
            { primary: "Cash (recorded by agents)" },
          ],
        },
        category: "Payments & Accounting",
      },
      {
        question: "How does the Recycling Marketplace work?",
        answer: {
          content:
            "Recyclables can be listed and purchased through the platform.",
          type: "list",
          data: [
            { primary: "Collection parties list categorized waste." },
            {
              primary: "Recycling companies can browse, buy, and rate sellers.",
            },
            { primary: "Supports bulk order aggregation and order tracking." },
          ],
        },
        category: "Recycling Marketplace",
      },
      {
        question: "What kind of reports are available?",
        answer: {
          content: "The platform provides rich dashboards and reporting tools.",
          type: "list",
          data: [
            { primary: "Waste collected per region and period." },
            { primary: "Revenue tracking, agent performance." },
            { primary: "Order fulfillment and recycling trends." },
            { primary: "Financial reports: P&L, Balance, Cash Flow." },
          ],
        },
        category: "Reports & Analytics",
      },
      {
        question: "How does the system handle communication?",
        answer: {
          content: "Automated and admin notifications are built-in.",
          type: "list",
          data: [
            {
              primary:
                "SMS & Email reminders for billing, collection schedules.",
            },
            { primary: "Push notifications for mobile users." },
            { primary: "Admin alerts for overdue invoices and pending tasks." },
          ],
        },
        category: "Communication & Notifications",
      },
      {
        question: "Is the system secure and compliant?",
        answer: {
          content:
            "Yes, it implements modern security and compliance features.",
          type: "list",
          data: [
            { primary: "JWT and OAuth2 for authentication." },
            { primary: "Audit logs for all key system actions." },
            { primary: "Data encryption for sensitive information." },
          ],
        },
        category: "Security & Compliance",
      },
      {
        question: "Can it integrate with external systems?",
        answer: {
          content: "Yes, APIs are available for third-party integration.",
          type: "list",
          data: [
            { primary: "Payment APIs (M-Pesa, Stripe, Bank APIs)" },
            { primary: "Email & SMS APIs (Twilio, SendGrid)" },
            { primary: "Government & compliance systems" },
            { primary: "Accounting tools like QuickBooks, Xero" },
          ],
        },
        category: "Integration & API",
      },
    ],
    getInTouch: {
      link: {
        children: "Contact Support",
        href: "csupport@sakataka.co.ke", // replace with actual support link
        target: "_blank",
        rel: "noopener noreferrer",
      },
    },
    categories: [
      "General",
      "Multi-Tenant Architecture",
      "User & Role Management",
      "Waste Collection",
      "Payments & Accounting",
      "Recycling Marketplace",
      "Communication & Notifications",
      "Reports & Analytics",
      "Security & Compliance",
      "Integration & API",
    ],
    activeCategory: "General",
  };

  return (
    <ContainerWrapper sx={undefined}>
      <Stack sx={{ py: 1, gap: { xs: 3, sm: 4, md: 5 } }}></Stack>
      <Grid
        container
        spacing={3}
        wrap="nowrap"
        pt={3}
        direction="column"
        sx={{ height: "90vh", justifyContent: "space-between" }}
      >
        <Grid size="grow">
          <Hero
            headLine={hero.headLine}
            captionLine={hero.captionLine}
            primaryBtn={hero.primaryBtn}
            videoSrc={hero.videoSrc}
            videoThumbnail={hero.videoThumbnail}
            listData={hero.listData}
          />

          <Benefit
            heading={benefit.heading}
            caption={benefit.caption}
            blockDetail={benefit.blockDetail}
          />
          {/* <Integration
            headLine={tags.heading}
            primaryBtn={tags.primaryBtn}
            captionLine={tags.description}
            tagList={tags.sections.map((section) => ({
              label: section.title,
              icon: section.image,
            }))}
          /> */}
          <Feature18
            heading={feature18.heading}
            caption={feature18.caption}
            topics={feature18.topics}
          />
          <Feature21
            heading={feature21.heading}
            caption={feature21.caption}
            image={feature21.image}
            features={feature21.features}
            primaryBtn={feature21.primaryBtn}
            secondaryBtn={feature21.secondaryBtn}
          />
          <Cta4
            headLine={cta4.headLine}
            primaryBtn={cta4.primaryBtn}
            profileGroups={cta4.profileGroups}
            clientContent={cta4.clientContent}
          />
          <Clientele3
            title={clientele.title}
            clienteleList={clientele.clienteleList}
          />
          <Cta5
            heading={cta5.heading}
            primaryBtn={cta5.primaryBtn}
            profileGroups={cta5.profileGroups}
            caption={cta5.caption}
            label={cta5.label}
            description={cta5.description}
            saleData={cta5.saleData}
          />
          <Faq6
            heading={faq.heading}
            caption={faq.caption}
            faqList={faq.faqList.map((item) => ({
              question: item.question,
              answer:
                typeof item.answer === "string"
                  ? item.answer
                  : {
                      content: item.answer.content,
                      type: "list",
                      data: item.answer.data.map((dataItem) => ({
                        primary: dataItem.primary,
                      })),
                    },
              category: item.category,
            }))}
            getInTouch={faq.getInTouch}
            categories={faq.categories}
          />
        </Grid>
        {/* <MuiLink href="/privacy-policy">Privacy Policy</MuiLink> */}
        <Footer7 />
      </Grid>
    </ContainerWrapper>
  );
}
