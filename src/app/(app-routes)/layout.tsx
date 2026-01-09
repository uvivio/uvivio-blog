import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import { APP_METADATA } from "@/config/metadata";
import AntdProvider from "@/providers/antd.provider";
import { QueryProvider } from "@/providers/query-provider";
import local from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import "../globals.css";

const secondaryFont = local({
  src: "../../../public/assets/fonts/CabinetGrotesk-Variable.ttf",
  variable: "--font-secondary",
});

const primaryFont = local({
  src: "../../../public/assets/fonts/Satoshi-Variable.ttf",
  variable: "--font-primary",
});

export const metadata = { ...APP_METADATA };

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${primaryFont.variable} ${secondaryFont.variable} antialiased`}
      >
        <div id="portal-root" />
        <Toaster position="top-right" />
        <QueryProvider>
          <AntdProvider>
            <TopLoader />

            <main suppressHydrationWarning>
              <NuqsAdapter>
                {" "}
                <Navbar />
                <main>{children}</main>
                <Footer />
              </NuqsAdapter>
            </main>
          </AntdProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

const TopLoader = () => (
  <NextTopLoader
    color="#004eea"
    initialPosition={0.08}
    crawlSpeed={200}
    height={3}
    crawl
    showSpinner
    easing="ease"
    speed={200}
    shadow="0 0 10px #004eea,0 0 5px #004eea"
    template='<div class="bar" role="bar"><div class="peg"></div></div> 
<div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    zIndex={1600}
  />
);
