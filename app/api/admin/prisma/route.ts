import { protectedAdminSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import z from "zod";

const AdminPrismaQueryBody = z.object({
  model: z.string(),
  action: z.enum(["findMany", "findUnique", "create", "update", "delete"]),
  where: z.record(z.string(), z.any()).optional(),
  orderBy: z.record(z.string(), z.string()).optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  data: z.record(z.string(), z.any()).optional(),
});

/**
 * Execute a prisma query
 * @description Executes a prisma query. Must be authenticated as an admin.
 * @body AdminPrismaQueryBody
 * @bodyDescription The body of the request to the prisma query
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { session, unauthorizedResponse } =
    await protectedAdminSession(request);

  if (!session) {
    return unauthorizedResponse;
  }

  const body = await request.json();
  const { model, action, where, orderBy, take, skip, data } =
    AdminPrismaQueryBody.parse(body);

  try {
    // @ts-ignore
    const result = await prisma[model][action]({
      where,
      orderBy,
      take,
      skip,
      data,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid prisma query", details: error },
      { status: 400 },
    );
  }
}
