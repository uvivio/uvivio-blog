"use client";
import AppLogo from "@/components/atoms/app-logo";
import ROUTES from "@/constants/routes";
import { env } from "@/env";
import { useScroll } from "@/hooks/use-scroll";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LandingNavbarCta from "./landing-navbar-cta";

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === ROUTES.home;
  const isScrolling = useScroll();
  const isActive = isHomePage ? isScrolling : true;

  // const isMentor = useIsMentor();
  // const hide = user && matchPathname(['/mentors/:path'], pathname);

  return (
    <nav
      suppressHydrationWarning
      className={`fixed top-0 z-50 mx-auto w-full select-none p-1 py-5 transition-colors duration-300 ${
        isActive ? "bg-tertiary-3" : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex w-full items-center justify-between px-6 lg:px-12">
        <AppLogo colorScheme={isActive ? "light" : "dark"} />

        <div className="hidden flex-grow items-center justify-center gap-5 font-primary text-[16px] font-[500] leading-none lg:flex">
          {/* {!isMentor && ( */}
          <Link
            href={`${env.NEXT_PUBLIC_APP_URL}/mentors`}
            className="cursor-pointer tracking-tight duration-300 hover:text-primary-5"
            target="_blank"
          >
            Explore
          </Link>
          {/* )} */}
          <Link
            href={`${env.NEXT_PUBLIC_APP_URL}/about`}
            className="cursor-pointer tracking-tight duration-300 hover:text-primary-5"
            target="_blank"
          >
            Why Uvivio
          </Link>
          <Link
            href="/blog"
            className="cursor-pointer tracking-tight duration-300 hover:text-primary-5"
          >
            Blog
          </Link>
          <Link
            href="https://uvivio.substack.com"
            className="cursor-pointer tracking-tight duration-300 hover:text-primary-5"
            target="_blank"
          >
            Community
          </Link>
        </div>

        <LandingNavbarCta />
      </div>
    </nav>
  );
};

export default Navbar;
