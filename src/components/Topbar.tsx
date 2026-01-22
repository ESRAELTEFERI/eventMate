"use client";

import { signOut } from "next-auth/react";
import { ThemeToggle } from "./theme-toggle";

export default function Topbar({ user }: { user: any }) {
  return (
    <header className="flex items-center justify-between bg-white border-b px-6 py-4">
        {/* Left */}
        <div className="font-medium">Welcome, {user.name ?? user.email}</div>

        {/* Right (grouped) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="px-4 py-2 text-sm bg-black text-white rounded"
          >
            Logout
          </button>

          <ThemeToggle />
        </div>
      </header>
  );
}
