"use client";

// @mui
import { useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";

// @project
import branding from "@/branding.json";

/***************************  LOGO - FAB  ***************************/

export default function LogoFab({ size = 24 }) {
  const theme = useTheme();
  const logoFabPath = branding.logo.logoFab;

  return logoFabPath ? (
    <CardMedia
      src={logoFabPath}
      component="img"
      alt="logo"
      sx={{ height: 1 }}
      loading="lazy"
    />
  ) : (
    <svg
      width={size}
      height={size}
      viewBox="0 0 98 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10380_3978)">
        <path
          d="M47.3333 5.35571C23.6771 5.35571 4.5 24.5329 4.5 48.189C4.5 71.8452 23.6771 91.0224 47.3333 91.0224H50.6667C74.3229 91.0224 93.5 71.8452 93.5 48.189C93.5 24.5329 74.3229 5.35571 50.6667 5.35571H47.3333Z"
          fill="url(#paint0_linear_1276_81272)"
        />
        <path
          d="M47.3333 5.35571C23.6771 5.35571 4.5 24.5329 4.5 48.189C4.5 71.8452 23.6771 91.0224 47.3333 91.0224H50.6667C74.3229 91.0224 93.5 71.8452 93.5 48.189C93.5 24.5329 74.3229 5.35571 50.6667 5.35571H47.3333Z"
          stroke="url(#paint1_linear_1276_81272)"
          strokeWidth="9"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M54.9092 36.4271C57.4504 35.0387 60.4586 37.2398 59.9077 40.0845L56.2289 59.083C56.2034 59.2543 56.1648 59.4244 56.1128 59.5919C55.9979 59.983 55.8316 60.3088 55.6248 60.5713L55.6066 60.5963C54.4914 62.1231 52.3507 62.456 50.8252 61.3398C50.0686 60.7862 49.6055 59.9802 49.4668 59.1221L49.4676 59.1226C49.0443 57.5306 49.6491 53.2572 52.8231 46.4168L54.046 47.7888L55.6654 41.1762C55.7381 40.8793 55.4152 40.643 55.1546 40.8025L49.3504 44.3531L51.0968 45.1536C47.804 48.6269 43.2194 51.8763 39.9689 52.2187C39.1569 52.3043 38.185 52.0911 37.4288 51.5377C35.9033 50.4215 35.5707 48.279 36.686 46.7522L36.6946 46.7404L36.7045 46.7271C36.8915 46.4504 37.1509 46.1932 37.488 45.9652C37.6319 45.8645 37.7825 45.7759 37.9382 45.6994L54.9092 36.4271ZM42.4176 59.161C43.3969 59.8631 44.7638 59.6318 45.4705 58.6444C45.9401 57.9883 46.2852 55.8511 46.4639 54.4907C46.5325 53.9682 46.0061 53.5908 45.5339 53.8239C44.3045 54.431 42.3937 55.4456 41.9241 56.1017C41.2173 57.0891 41.4383 58.4588 42.4176 59.161Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1276_81272"
          x1="89"
          y1="12.647"
          x2="-6.43223"
          y2="102.064"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={theme.palette.primary.main} />
          <stop
            offset="1"
            stopColor={theme.palette.primary.light}
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1276_81272"
          x1="-14.8889"
          y1="110.899"
          x2="125.136"
          y2="-10.1282"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={theme.palette.primary.main} />
          <stop
            offset="1"
            stopColor={theme.palette.primary.light}
            stopOpacity="1"
          />
        </linearGradient>
        <clipPath id="clip0_1276_81272">
          <rect
            width="40"
            height="36.6667"
            fill="white"
            transform="translate(29 29.8557)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

LogoFab.propTypes = { size: Number };
