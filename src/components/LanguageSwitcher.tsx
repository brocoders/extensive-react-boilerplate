"use client";

import { usePathname, useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const languages = [
  { code: "en", label: "English" },
  { code: "uk", label: "Українська" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname.split("/")[1] || "en";

  const handleChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value;

    // Якщо шлях взагалі порожній app-bar.tsx(наприклад, просто /), то додаємо мову
    if (!pathname) {
      router.push(`/${newLang}`);
      return;
    }

    const pathSegments = pathname.split("/");
    pathSegments[1] = newLang;
    const newPath = pathSegments.join("/");

    router.push(newPath);
  };

  return (
    <Select
      value={currentLang}
      onChange={handleChange}
      size="small"
      variant="outlined"
      sx={{
        minWidth: 120,
        color: "inherit",
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255, 255, 255, 0.5)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        ".MuiSvgIcon-root ": {
          fill: "currentColor",
        },
      }}
    >
      {languages.map((lang) => (
        <MenuItem key={lang.code} value={lang.code}>
          {lang.label}
        </MenuItem>
      ))}
    </Select>
  );
}
