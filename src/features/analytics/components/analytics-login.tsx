"use client";

import { PasswordInput } from "@/components/atoms/password-input";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAction } from "../actions/auth-actions";

export function AnalyticsLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("password", password);

      const result = await loginAction(formData);

      if (result.success) {
        router.push("/analytics");
        router.refresh();
      } else {
        setError(result.error || "Authentication failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border border-tertiary-4 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-1">
            <LogIn className="h-6 w-6 text-primary-6" />
          </div>
          <h1 className="font-secondary text-2xl font-bold text-tertiary-12">
            Analytics Access
          </h1>
          <p className="mt-2 font-primary text-sm text-tertiary-7">
            Enter the password to view blog analytics
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-primary text-sm font-medium text-tertiary-12"
            >
              Password
            </label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="off"
              className="w-full rounded-md border border-tertiary-5 bg-white px-4 py-2.5 pr-10 font-primary text-sm text-tertiary-12 placeholder-tertiary-7 transition-colors focus:border-primary-6 focus:outline-none focus:ring-2 focus:ring-primary-1"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full rounded-md bg-primary-6 px-4 py-2.5 font-primary text-sm font-medium text-white transition-colors hover:bg-primary-7 focus:outline-none focus:ring-2 focus:ring-primary-6 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Access Analytics"}
          </button>
        </form>
      </div>
    </div>
  );
}
