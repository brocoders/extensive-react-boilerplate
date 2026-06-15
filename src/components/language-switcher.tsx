"use client";

import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", label: "English" },
  { code: "uk", label: "Українська" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const currentLang = pathname.split("/")[1] || "en";

  const handleChange = (newLang: string) => {
    if (!pathname) {
      window.location.assign(`/${newLang}`);
      return;
    }

    const pathSegments = pathname.split("/");
    pathSegments[1] = newLang;
    const newPath = pathSegments.join("/");

    window.location.assign(newPath);
  };

  return (
    <Select value={currentLang} onValueChange={handleChange}>
      <SelectTrigger size="sm" className="min-w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
