import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        EventMate
      </Link>
      <div className="space-x-4">
        <Link href="/events" className="hover:text-blue-500">
          Events
        </Link>
        <Link href="/auth/login" className="hover:text-blue-500">
          Login
        </Link>
        <Link href="/auth/register" className="hover:text-blue-500">
          Register
        </Link>
      </div>
    </nav>
  );
}
