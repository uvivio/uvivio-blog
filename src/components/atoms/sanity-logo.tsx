import ROUTES from "@/constants/routes";
import Link from "next/link";
import AppLogo from "./app-logo";

/** 
This component is used in place of the Sanity logo so that, when clicked, it routes to the homepage from the Sanity Studio layout.
*/
export const SanityLogo = () => {
  return (
    <Link href={ROUTES.home}>
      <AppLogo />
    </Link>
  );
};
