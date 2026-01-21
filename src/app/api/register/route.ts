// import { getPrisma } from "@/lib/prisma";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.password) {
      return Response.json(
        { message: "Please fill in all fields" },
        { status: 400 }
      );
    }

    const allowedRoles = ["USER", "ORGANIZER"] as const;

    const role = allowedRoles.includes(body.role) ? body.role : "USER";

    // const prisma = getPrisma();

    const existing = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existing) {
      return Response.json(
        { message: "This email is already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role,
      },
    });

    return Response.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
