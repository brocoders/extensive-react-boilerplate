// @next
import dynamic from "next/dynamic";

// @project
const Loader = dynamic(() => import("@/components/Loader"));

/***************************  LOADING  ***************************/

export default function Loading() {
  return <Loader />;
}
