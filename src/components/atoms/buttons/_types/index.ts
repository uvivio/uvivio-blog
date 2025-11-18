import type { ButtonHTMLAttributes } from "react";

export type ButtonColorVariant =
  | "default"
  | "primary"
  | "outlined"
  | "outlined-white"
  | "none"
  | "white"
  | "black"
  | "outlined-black"
  | "danger";

export interface PrimaryButtonProps {
  block?: boolean;
  buttonText?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  linkClassName?: string;
  color?: string;
  link?: string | { href: string; replace?: boolean; newTab?: boolean };
  variant?: ButtonColorVariant;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  target?: "_blank" | "_self" | "_parent" | "_top";
}
