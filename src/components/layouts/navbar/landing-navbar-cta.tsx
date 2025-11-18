"use client";

import PrimaryButton from "@/components/atoms/buttons/primary-button";
import ROUTES from "@/constants/routes";
import { env } from "@/env";
import { useScroll } from "@/hooks/use-scroll";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Link from "next/link";
import { useState } from "react";

const LandingNavbarCta = () => {
  const isScrolling = useScroll();
  const isActive = isScrolling;

  return (
    <>
      <div className="hidden items-center gap-4 lg:flex">
        <div className="flex">
          <PrimaryButton
            buttonText="Log in"
            className="hidden !py-1.5 text-sm capitalize lg:flex"
            variant={"outlined"}
            link={`${env.NEXT_PUBLIC_APP_URL}${ROUTES.login}`}
            target="_blank"
          />
        </div>
        <div className="flex">
          <PrimaryButton
            link={`${env.NEXT_PUBLIC_APP_URL}${ROUTES.register}`}
            buttonText="Get started for free"
            className="hidden text-sm capitalize lg:flex"
            target="_blank"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 lg:hidden">
        <SidebarMenu />
      </div>
    </>
  );
};

const SidebarMenu = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const linkclass =
    "cursor-pointer duration-300 hover:text-primary-5 tracking-tight border-b pb-3";
  return (
    <>
      <MenuOutlined onClick={showDrawer} className="text-xl" role="button" />
      <Drawer
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
        width={300}
        className="p-0"
        styles={{ body: { padding: "1rem" } }}
      >
        <div className="flex h-full flex-col justify-between" onClick={onClose}>
          <div className="grid gap-4 font-primary text-lg font-bold tracking-tight">
            <Link
              href={`${env.NEXT_PUBLIC_APP_URL}/courses`}
              className={linkclass}
              target="_blank"
            >
              Explore
            </Link>
            <Link
              href={`${env.NEXT_PUBLIC_APP_URL}/about`}
              className={linkclass}
              target="_blank"
            >
              Why Uvivio
            </Link>
            <Link
              href="https://uvivio.substack.com"
              className={linkclass}
              target="_blank"
            >
              Community
            </Link>
          </div>
          <div className="flex w-full flex-col space-y-4">
            <PrimaryButton
              buttonText="Log in"
              className="!w-full !py-3.5 text-sm capitalize"
              variant="outlined"
              link={`${env.NEXT_PUBLIC_APP_URL}${ROUTES.login}`}
              target="_blank"
            />
            <PrimaryButton
              link={`${env.NEXT_PUBLIC_APP_URL}${ROUTES.register}`}
              buttonText="Get started for free"
              className="!w-full py-3.5 text-sm capitalize"
              target="_blank"
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default LandingNavbarCta;
