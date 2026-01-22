import Link from "next/link";

type Role = "ADMIN" | "ORGANIZER" | "USER";

export default function Sidebar({ role }: { role?: Role }) {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 font-bold text-xl">Dashboard</div>

      <nav className="px-4 space-y-2">
        {role === "ADMIN" && (
          <>
            <Link
              href="/dashboard/admin"
              className="block p-2 hover:bg-gray-100 rounded"
            >
              Admin Home
            </Link>
            <Link
              href="/dashboard/admin/users"
              className="block p-2 hover:bg-gray-100 rounded"
            >
              Users
            </Link>
          </>
        )}

        {role === "ORGANIZER" && (
          <>
            <Link
              href="/dashboard/organizer"
              className="block p-2 hover:bg-gray-100 rounded"
            >
              Organizer Home
            </Link>
            <Link
              href="/dashboard/organizer/events"
              className="block p-2 hover:bg-gray-100 rounded"
            >
              My Events
            </Link>
          </>
        )}

        {role === "USER" && (
          <>
            <Link
              href="/dashboard/user"
              className="block p-2 hover:bg-gray-100 rounded"
            >
              User Home
            </Link>
            <Link
              href="/dashboard/user/bookings"
              className="block p-2 hover:bg-gray-100 rounded"
            >
              My Bookings
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
