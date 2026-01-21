"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      callbackUrl: "/",
      // redirect: true,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-neutral-200 p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Welcome back
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Sign in to your EventMate account
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-neutral-600">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-600">Password</label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-500 transition"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-500 text-center">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
