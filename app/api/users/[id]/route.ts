import { protectedSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const GetUserPathParams = z.object({
  id: z.string().describe("User ID"),
});

export const GetUserResponse = z.object({
  user: z.object({
    id: z.string(),
    email: z.email(),
    username: z.string().nullable(),
    name: z.string(),
  }),
});

/**
 * Get user by ID
 * @description Fetches user information by ID
 * @pathParams GetUserPathParams
 * @response GetUserResponse
 */
export async function GET(
  req: NextRequest,
  { params }: any,
): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);
  const { id } = GetUserPathParams.parse(params);

  if (!session) {
    return unauthorizedResponse;
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
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
    const result = GetUserResponse.parse({ user });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
  }
}
