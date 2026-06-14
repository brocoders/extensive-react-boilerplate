declare module "lucide-react/dist/esm/icons/*" {
  // eslint-disable-next-line no-restricted-imports -- type-only import has no bundle cost
  import type { LucideIcon } from "lucide-react";

  const icon: LucideIcon;
  export default icon;
}
