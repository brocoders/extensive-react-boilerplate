// @next
import dynamic from "next/dynamic";

// @project
const AdminLayout = dynamic(() => import("@/layouts/AdminLayout"));

/***************************  LAYOUT - ADMIN  ***************************/

export default function Layout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}

Layout.propTypes = { children: PropTypes.any };
