// @next
import dynamic from "next/dynamic";
// @project
const AuthLayout = dynamic(() => import("@/layouts/AuthLayout"));

/***************************  LAYOUT - AUTH PAGES  ***************************/

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ language: string }>;
}) {
  const { children } = props;
  return <AuthLayout>{children}</AuthLayout>;
}
