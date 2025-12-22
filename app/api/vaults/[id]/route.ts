import { protectedSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const GetVaultPathParams = z.object({
  id: z.string().describe("Vault ID"),
});

const GetVaultResponse = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string().nullable(),
    name: z.string(),
  }),
  members: z.array(
    z.object({
      id: z.string(),
      email: z.string(),
      username: z.string().nullable(),
      name: z.string(),
    }),
  ),
});

/**
 * Get vault by ID
 * @description Fetches vault information by ID
 * @pathParams GetVaultPathParams
 * @response GetVaultResponse
 */
export async function GET(
  req: NextRequest,
  { params }: any,
): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);
  const { id } = GetVaultPathParams.parse(params);

  if (!session) {
    return unauthorizedResponse;
  }

  const vault = await prisma.vault.findUnique({
    where: {
      id,
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
    select: {
      id: true,
      name: true,
      owner: {
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
        },
      },
      members: {
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
        },
      },
    },
  });

  if (!vault) {
    return NextResponse.json({ error: "Vault not found" }, { status: 404 });
  }

  try {
    const result = GetVaultResponse.parse(vault);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid vault data" }, { status: 400 });
  }
}
