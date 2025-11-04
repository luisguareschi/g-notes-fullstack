import { protectedAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export const GetAdminUsersReponse = z.array(
  z.object({
    id: z.string(),
    email: z.email(),
    username: z.string().nullable(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export const GetAdminUsersQueryParams = z.object({
  search: z.string().optional().default(""),
  orderBy: z.enum(["createdAt", "updatedAt"]).optional().default("createdAt"),
  orderDirection: z.enum(["asc", "desc"]).optional().default("desc"),
});

/**
 * Get all users
 * @description Fetches all users
 * @params GetAdminUsersQueryParams
 * @response GetAdminUsersReponse
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedAdminSession(req);

  if (!session) {
    return unauthorizedResponse;
  }

  const { search, orderBy, orderDirection } = GetAdminUsersQueryParams.parse(
    Object.fromEntries(req.nextUrl.searchParams.entries()),
  );

  console.log(search, orderBy, orderDirection);

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      [orderBy]: orderDirection,
    },
    where: {
      OR: [
        { email: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ],
    },
  });

  try {
    const result = GetAdminUsersReponse.parse(users);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid users data" }, { status: 400 });
  }
}
