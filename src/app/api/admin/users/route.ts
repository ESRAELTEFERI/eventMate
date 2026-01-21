import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
    return new Response(JSON.stringify(users));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch users" }), {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return new Response(JSON.stringify({ message: "Missing user ID" }), {
        status: 400,
      });
    }

    await prisma.user.delete({ where: { id } });
    return new Response(JSON.stringify({ message: "Deleted" }));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to delete user" }), {
      status: 500,
    });
  }
}
