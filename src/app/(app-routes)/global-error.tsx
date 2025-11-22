"use client";

import AppLogo from "@/components/atoms/app-logo";
import PrimaryButton from "@/components/atoms/buttons/primary-button";
import * as Sentry from "@sentry/nextjs";
import { Result } from "antd";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.dir({ error }, { depth: Infinity });
  document.title = "Application Error";

  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("/studio")) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <nav className="sticky top-0 z-40 mx-auto w-full select-none bg-tertiary-3 p-1 py-5">
          <div className="mx-auto flex w-full items-center justify-between px-6 lg:px-12">
            <AppLogo />
          </div>
        </nav>
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
          <Result
            status="500"
            title="An unexpected error occurred."
            // subTitle={error.message || 'Something went wrong'}
            extra={[
              <PrimaryButton
                variant="outlined"
                onClick={() => {
                  if (history.length > 0) history.back();
                  else location.href = "/dashboard";
                }}
                className="p-3 px-20"
                key={"home"}
              >
                Go back
              </PrimaryButton>,
              <PrimaryButton
                onClick={() => reset()}
                className="p-3 px-20"
                key={"retry"}
              >
                Retry
              </PrimaryButton>,
            ]}
          />
        </div>
      </body>
    </html>
  );
}
