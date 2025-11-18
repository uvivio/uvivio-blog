import { cn } from "@/libs/utils";
import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  iconClassName?: string;
  className?: string;
  iconType?: "slash" | "arrow";
  handleClick?: () => void;
}

const Breadcrumb = ({
  items,
  iconType = "arrow",
  iconClassName,
  className,
  handleClick,
}: BreadcrumbProps) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol
        className={cn(
          "inline-flex flex-wrap items-center space-x-1 rtl:space-x-reverse",
          className
        )}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className="inline-flex items-center"
            aria-current={index === items.length - 1 ? "page" : undefined}
          >
            {index !== 0 && (
              <div className="flex items-center">
                {iconType === "arrow" && (
                  <svg
                    className={cn(
                      "mx-1 h-3 w-3 text-black rtl:rotate-180",
                      iconClassName
                    )}
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                )}
                {iconType === "slash" && (
                  <div className={cn("h-fit w-fit", iconClassName)}>/</div>
                )}
              </div>
            )}
            {(() => {
              const isClickable =
                handleClick && index === 0 && items.length > 1;
              const commonClassName =
                "inline-flex items-center font-primary text-[14px] tracking-tight";

              if (item.href && !isClickable) {
                return (
                  <Link
                    href={item.href}
                    className={cn(
                      commonClassName,
                      "font-semibold",
                      items.length > 1 && index === 0
                        ? "text-tertiary-8"
                        : "text-black"
                    )}
                  >
                    {item.icon && (
                      <span className="me-2.5 h-3 w-3">{item.icon}</span>
                    )}
                    {item.label}
                  </Link>
                );
              }

              return (
                <span
                  onClick={isClickable ? handleClick : undefined}
                  className={cn(
                    commonClassName,
                    "font-medium sm:text-[16px] md:ms-1",
                    {
                      "cursor-pointer font-semibold text-tertiary-8":
                        isClickable,
                      "font-semibold text-black": !isClickable && index === 0,
                    }
                  )}
                >
                  {item.icon && (
                    <span className="me-2.5 h-3 w-3">{item.icon}</span>
                  )}
                  {item.label}
                </span>
              );
            })()}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
