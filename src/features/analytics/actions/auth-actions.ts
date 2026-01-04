"use server";

import { cookies } from "next/headers";

const ADMIN_PASSWORD = "uvivio_admin";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;

  if (!password) {
    return { success: false, error: "Password is required" };
  }

  if (password.toLowerCase().trim() !== ADMIN_PASSWORD.toLowerCase()) {
    return { success: false, error: "Invalid credentials" };
  }

  const cookieStore = await cookies();
  cookieStore.set("analytics_auth", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { success: true };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("analytics_auth");
  return { success: true };
}

export async function checkAuthAction() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("analytics_auth");

  return {
    authenticated: !!authCookie,
  };
}
