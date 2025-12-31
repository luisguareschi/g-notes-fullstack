import { protectedSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { GetUsersReponse } from "@/schemas/users";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get all users
 * @description Fetches all users
 * @response GetUsersReponse
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);

  if (!session) {
    return unauthorizedResponse;
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
    },
  });

  try {
    const result = GetUsersReponse.parse(users);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid users data" }, { status: 400 });
  }
}
