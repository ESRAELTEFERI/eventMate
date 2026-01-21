"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setSuccess("Account created. Redirecting to login…");

    setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-neutral-200 p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Create your account
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Start booking and managing events
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-neutral-600">Full name</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

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

          <select
            name="role"
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2"
          >
            <option value="USER">User</option>
            <option value="ORGANIZER">Organizer</option>
          </select>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 transition px-4 py-2 font-medium text-white disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
        )}

        {success && (
          <p className="mt-4 text-sm text-green-400 text-center">{success}</p>
        )}

        <p className="mt-6 text-sm text-neutral-400 text-center">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
