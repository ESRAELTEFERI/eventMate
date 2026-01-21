import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const id = new URL(req.url).pathname.split("/").pop();
    if (!id) {
      return new Response(JSON.stringify({ message: "Missing user ID" }), {
        status: 400,
      });
    }

    const { name, email, role } = await req.json();

    const updated = await prisma.user.update({
      where: { id },
      data: { name, email, role },
    });

    return new Response(JSON.stringify(updated));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to update user" }), {
      status: 500,
    });
  }
}
