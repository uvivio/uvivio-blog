"use client";

import classNames from "classnames";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import type { PrimaryButtonProps } from "./_types";

const PrimaryButton = ({
  buttonText,
  children,
  className,
  linkClassName,
  variant = "default",
  color,
  loading,
  disabled,
  link,
  onClick,
  type = "button",
  target,
}: React.PropsWithChildren<PrimaryButtonProps>) => {
  const renderButton = () => (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={color ? { backgroundColor: color } : undefined}
      className={classNames(
        "group rounded p-2 px-4 font-primary text-[14px] font-[500] duration-300",
        {
          "bg-primary-6 text-white hover:bg-primary-5": [
            "default",
            "primary",
          ].includes(variant),
          "border border-primary-6 text-primary-6 hover:bg-primary-5 hover:text-white":
            variant === "outlined",
          "border border-red-600 text-red-600 hover:bg-red-500 hover:text-white":
            variant === "danger",
          "!bg-white hover:!bg-white/80": variant === "white",
          "!bg-black hover:!bg-black/80": variant === "black",
          "border border-white text-white hover:bg-white hover:text-primary-5":
            variant === "outlined-white",
          "border border-black !text-black hover:bg-white":
            variant === "outlined-black",
        },
        className,
        disabled || loading
          ? "cursor-not-allowed border-zinc-400 !bg-gray-400 !text-white"
          : ""
      )}
    >
      <span className="flex items-center justify-center gap-0.5">
        {loading && (
          <span className="flex items-center justify-center">
            <LoaderCircle className="animate-spin" size={16.5} />
          </span>
        )}
        {buttonText || children}
      </span>
    </button>
  );
  return link ? (
    <Link
      prefetch={false}
      href={typeof link === "string" ? link : link.href || "#"}
      replace={typeof link === "string" ? false : link.replace}
      target={
        target ||
        (typeof link !== "string" && link?.newTab ? "_blank" : undefined)
      }
      referrerPolicy={
        target === "_blank" || (typeof link !== "string" && link?.newTab)
          ? "no-referrer"
          : undefined
      }
      className={classNames("w-full", linkClassName)}
    >
      {renderButton()}
    </Link>
  ) : (
    renderButton()
  );
};

export default PrimaryButton;

export const RefreshPageButton = ({
  children,
}: React.PropsWithChildren<PrimaryButtonProps>) => {
  const handleClick = () => {
    if (!window || typeof window === "undefined") return;
    window.location.reload();
  };
  return <PrimaryButton onClick={handleClick}>{children}</PrimaryButton>;
};
