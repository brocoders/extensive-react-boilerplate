import useLanguage from "@/services/i18n/use-language";
import {
  LeavePageActionsContext,
  LeavePageContext,
} from "@/services/leave-page/leave-page-context";
// Need for leave page logic
// eslint-disable-next-line no-restricted-imports
import NextLink, { LinkProps } from "next/link";
import { Ref, useContext } from "react";

function Link(props: LinkProps & { ref?: Ref<HTMLAnchorElement> }) {
  const language = useLanguage();
  const { isLeavePage } = useContext(LeavePageContext);
  const { setLeavePage, openModal } = useContext(LeavePageActionsContext);
  let href = props.href;

  if (typeof href === "string" && href.startsWith("/")) {
    href = `/${language}${href}`;
  } else if (typeof href === "object" && href !== null) {
    const pathname = href.pathname
      ? `/${language}${href.pathname}`
      : href.pathname;
    href = {
      ...href,
      pathname,
    };
  }

  return (
    <NextLink
      ref={props.ref}
      {...props}
      href={href}
      onClick={(e) => {
        if (isLeavePage) {
          e.preventDefault();
          setLeavePage({
            [props.replace ? "replace" : "push"]: href,
          });
          openModal();
        } else {
          props.onClick?.(e);
        }
      }}
    />
  );
}

export default Link;
