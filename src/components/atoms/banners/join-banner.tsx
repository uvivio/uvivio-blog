"use client";
import { env } from "@/env";
import { isEmail, validateEmail } from "@/utils/helpers";
import classNames from "classnames";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import PrimaryButton from "../buttons/primary-button";
import ImageComponent from "../common/image";

const JoinBanner = ({
  type,
}: {
  type?: "waitlist" | ({} | "");
  success_message?: string;
}) => {
  const id = React.useId();
  const key = React.useId();
  const images = [
    "/assets/images/mentors/mentor-1.png",
    "/assets/images/mentors/mentor-2.png",
    "/assets/images/mentors/mentor-3.png",
    "/assets/images/mentors/mentor-4.png",
  ];
  const [email, setEmail] = React.useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    inputRef.current?.focus();
    if (!email || email.trim().length == 0) {
      toast.error("Please enter a valid email address", { id: key });
      return;
    }
    const { error } = validateEmail(email);
    if (error) {
      toast.error(error, { id: key });
      return;
    }
  };

  return (
    <>
      <div className="grid w-full items-center justify-center gap-8 rounded-xl bg-primary-1 p-10 sm:py-20 lg:grid-cols-2 lg:gap-3">
        <div className="space-y-2 lg:px-16">
          <h1 className="max-w-sm font-secondary text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
            Take the Next Step to Unlock Your Potential with Uvivio
          </h1>
          <p className="max-w-lg font-primary text-sm leading-none tracking-tight text-tertiary-8 sm:text-lg">
            Get matched with the right mentors, join hands-on courses, and use
            AI-powered tools designed for your growth.
          </p>
          <div
            className={classNames("mt-5 flex items-center gap-1.5", {
              hidden: type === "waitlist",
            })}
          >
            <div className="flex items-center">
              {images.map((src, index) => (
                <div
                  key={index}
                  className={classNames(
                    "relative h-10 w-10 overflow-hidden rounded-full border border-white",
                    index > 0 && "z-10 -ml-3"
                  )}
                  style={{ zIndex: images.length - index }}
                >
                  <ImageComponent
                    src={src}
                    alt={`Avatar ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="font-primary text-sm tracking-tight text-tertiary-8">
              Join a thriving community of 10,000+ learners and mentors.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:items-center lg:justify-center">
          <div className="space-y-1">
            <label
              htmlFor={id}
              className="font-primary font-bold tracking-tight text-tertiary-8"
            >
              Enter your Email
            </label>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
              <div className="min-w-[15rem] rounded border border-transparent bg-white p-1 duration-300 focus-within:border-primary-6">
                <input
                  ref={inputRef}
                  value={email}
                  onChange={({ target: { value } }) => setEmail(value)}
                  required
                  id={id}
                  type="email"
                  className="h-full w-full bg-transparent p-3 outline-none focus:ring-0"
                  placeholder="e.g johndoe@gmail.com"
                />
              </div>
              <PrimaryButton
                onClick={handleSubmit}
                link={
                  email?.length > 0 && isEmail(email)
                    ? `${env.NEXT_PUBLIC_APP_URL}/onboarding?email=${email}`
                    : undefined
                }
                target="_blank"
                className="!w-full p-3 px-6 sm:w-auto"
              >
                {type == "waitlist" ? "Join waitlist" : "Join for free"}
              </PrimaryButton>
            </div>
            {type !== "waitlist" && (
              <p className="font-primary text-sm tracking-tight text-tertiary-8">
                Signing up is free and takes less than 5 minutes.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinBanner;
