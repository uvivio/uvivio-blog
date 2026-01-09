import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "430px",
      },
      animation: {
        "loop-scroll": "loop-scroll 30s linear infinite",
        pulseBorder: "pulseBorder 5s infinite ease-in-out",
      },
      keyframes: {
        "loop-scroll": {
          from: {
            transform: "translateX(30%)",
          },
          to: {
            transform: "translateX(-100%)",
          },
        },
        pulseBorder: {
          "0%": {
            borderColor: "transparent",
            boxShadow: "0 0 0px rgba(255, 0, 150, 0)",
          },
          "50%": {
            borderColor: "#004eea",
            boxShadow: "0 0 12px #004eea6a",
          },
          "100%": {
            borderColor: "transparent",
            boxShadow: "0 0 0px rgba(255, 0, 150, 0)",
          },
        },
      },
      fontFamily: {
        primary: ["var(--font-primary)", "sans-serif"],
        secondary: ["var(--font-secondary)", "serif"],
      },
      colors: {
        "primary-1": "#e6edfd",
        "primary-2": "#c2d5fa",
        "primary-3": "#91b3f6",
        "primary-4": "#5e8ff2",
        "primary-5": "#2e6eee",
        "primary-6": "#004eea",
        "primary-7": "#0042c7",
        "primary-8": "#0037a6",
        "primary-9": "#002c85",
        "primary-10": "#002369",
        "secondary-1": "#FFF7E6",
        "secondary-2": "#FFECC2",
        "secondary-3": "#FFDD91",
        "secondary-4": "#FFCE5E",
        "secondary-5": "#FFBF2E",
        "secondary-6": "#FFB100",
        "secondary-7": "#D99600",
        "secondary-8": "#B57E00",
        "secondary-9": "#916500",
        "secondary-10": "#735000",
        "tertiary-1": "#FFFFFF",
        "tertiary-2": "#FCFCFC",
        "tertiary-3": "#F5F5F5",
        "tertiary-4": "#F0F0F0",
        "tertiary-5": "#D9D9D9",
        "tertiary-6": "#BFBFBF",
        "tertiary-7": "#8C8C8C",
        "tertiary-8": "#595959",
        "tertiary-9": "#454545",
        "tertiary-10": "#262626",
        "tertiary-11": "#1F1F1F",
        "tertiary-12": "#141414",
        "tertiary-13": "#F0F0F0",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [scrollbar, typography],
} satisfies Config;
