import { protectedSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const MeResponse = z.object({
  user: z.object({
    id: z.string(),
    email: z.email(),
    username: z.string().nullable(),
    name: z.string(),
  }),
});

/**
 * Get current user information
 * @description Fetches current user information
 * @response MeResponse
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);

  if (!session) {
    return unauthorizedResponse;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const result = MeResponse.parse({ user });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
  }
}
