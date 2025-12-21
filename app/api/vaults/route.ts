import { protectedSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const GetVaultsResponse = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    ownerId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

/**
 * Get all vaults
 * @description Fetches all vaults for the current user
 * @response GetVaultsResponse
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);

  if (!session) {
    return unauthorizedResponse;
  }

  const vaults = await prisma.vault.findMany({
    where: {
      OR: [
        {
          ownerId: {
            equals: session.user.id,
          },
        },
        {
          members: {
            some: { id: session.user.id },
          },
        },
      ],
    },
  });

  try {
    const result = GetVaultsResponse.parse(vaults);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid vaults data" }, { status: 400 });
  }
}
