import { useContext, useEffect } from "react";
import { LeavePageActionsContext } from "./leave-page-context";

const useLeavePage = (isDirty: boolean) => {
  const { trackLeavePage, untrackLeavePage } = useContext(
    LeavePageActionsContext
  );

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    if (isDirty) {
      trackLeavePage();
      window.addEventListener("beforeunload", onBeforeUnload);
    }

    return () => {
      if (isDirty) {
        untrackLeavePage();
        window.removeEventListener("beforeunload", onBeforeUnload);
      }
    };
  }, [isDirty, trackLeavePage, untrackLeavePage]);
};

export default useLeavePage;
