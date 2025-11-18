"use client";
import { APP_NAME } from "@/config/metadata";
import socials from "@/data/socials";
import { env } from "@/env";
import Link from "next/link";
import AppLogo from "../atoms/app-logo";

const Footer = () => {
  const footerSectionItemClass = "tracking-tight !font-primary";

  return (
    <div
      suppressHydrationWarning
      className="w-full bg-[#F5F5F5] p-5 pb-10 pt-20"
    >
      <div className="mx-auto px-3 lg:px-12">
        <div className="grid grid-cols-12 items-start gap-5">
          <div className="col-span-full lg:col-span-6">
            <div className="relative flex max-w-[3em]">
              <AppLogo className="!text-3xl lg:!text-5xl" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              {socials.map((item, index) => (
                <Link
                  key={index}
                  prefetch={false}
                  href={item.link || "#"}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-6 text-white">
                    {item.icon}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-full grid grid-cols-2 gap-4 xs:grid-cols-3 lg:col-span-6">
            <div className="-gap-2 grid xs:items-center xs:justify-center">
              <FooterSectionTitle title="Product" />
              {productLinks.map(({ label, link }, i) => (
                <Link
                  href={link ? `${env.NEXT_PUBLIC_APP_URL}${link}` : "#"}
                  key={i}
                  className={footerSectionItemClass}
                  target="_blank"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="-gap-2 grid xs:items-center xs:justify-center">
              <FooterSectionTitle title="Resources" />
              {resourcesLinks.map(({ label, link, isBlog }, i) => (
                <Link
                  href={
                    isBlog
                      ? link || "#"
                      : link
                        ? `${env.NEXT_PUBLIC_APP_URL}${link}`
                        : "#"
                  }
                  key={i}
                  className={footerSectionItemClass}
                  target={isBlog ? undefined : "_blank"}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="-gap-2 grid xs:items-center xs:justify-center">
              <FooterSectionTitle title={`About ${APP_NAME}`} />
              {aboutLinks.map(({ label, link }, i) => (
                <Link
                  href={link ? `${env.NEXT_PUBLIC_APP_URL}${link}` : "#"}
                  key={i}
                  className={footerSectionItemClass}
                  target="_blank"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-[#D9D9D9] pt-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            {legalLinks.map((item, i) => (
              <Link
                key={i}
                href={
                  item.link ? `${env.NEXT_PUBLIC_APP_URL}${item.link}` : "#"
                }
                className="!font-primary text-sm tracking-tight text-tertiary-8"
                target="_blank"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="font-primary text-sm tracking-tight text-tertiary-8">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

const FooterSectionTitle = ({ title }: { title: string }) => (
  <h1 className="font-primary text-lg font-bold tracking-tight">{title}</h1>
);

type FooterLink = { label: string; link?: string; isBlog?: boolean };

const productLinks: Array<FooterLink> = [
  { label: "Explore Courses", link: "/courses" },
  { label: "Alfred AI", link: "#chat-with-alfred" },
  { label: "Mentors Leaderboard", link: "/mentors-leaderboard" },
];

const resourcesLinks: Array<FooterLink> = [
  { label: "Pricing", link: "/pricing" },
  { label: "Blog", link: "/blog", isBlog: true },
  { label: "Help Center", link: "/help-center" },
];

const aboutLinks: Array<FooterLink> = [
  { label: `Why ${APP_NAME}`, link: "/about" },
  { label: "Become a Mentor", link: "/become-a-mentor" },
];

const legalLinks: Array<FooterLink> = [
  { label: "Privacy policy", link: "/privacy" },
  { label: "Terms of service", link: "/terms" },
];

export default Footer;
