import { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8">
        <h2 className="text-xl font-semibold text-gray-800">EventMate</h2>

        <nav className="mt-8 space-y-2">
          <Link
            href={`/dashboard/${role}`}
            className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            Dashboard
          </Link>

          {role === "ADMIN" && (
            <Link
              href="/dashboard/admin/users"
              className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              Users
            </Link>
          )}

          {role === "ORGANIZER" && (
            <Link
              href="/dashboard/organizer/events"
              className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              My Events
            </Link>
          )}

          <Link
            href="/api/auth/signout"
            className="block rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
          >
            Sign out
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
