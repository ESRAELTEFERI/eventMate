import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const role = session.user.role;

  if (role === "ADMIN") redirect("/dashboard/admin");
  if (role === "ORGANIZER") redirect("/dashboard/organizer");
  if (role === "USER") redirect("/dashboard/user");

  redirect("/auth/login");
}
