import { protectedSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const GetVaultsResponseItem = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const GetVaultsResponse = z.array(GetVaultsResponseItem);

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

  let vaults = await prisma.vault.findMany({
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

  if (vaults.length === 0) {
    await prisma.vault.create({
      data: {
        name: "Personal",
        ownerId: session.user.id,
        members: {
          connect: { id: session.user.id },
        },
      },
    });

    vaults = await prisma.vault.findMany({
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
  }

  try {
    const result = GetVaultsResponse.parse(vaults);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid vaults data" }, { status: 400 });
  }
}

const CreateVaultBody = z.object({
  name: z.string().min(1, "Name is required"),
});

/**
 * Create a new vault
 * @description Creates a new vault for the current user
 * @body CreateVaultBody
 * @response GetVaultsResponseItem
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);

  if (!session) {
    return unauthorizedResponse;
  }

  let data: z.infer<typeof CreateVaultBody>;
  try {
    data = CreateVaultBody.parse(await req.json());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid vault data" }, { status: 400 });
  }

  try {
    const existingVault = await prisma.vault.findFirst({
      where: {
        name: data.name,
        ownerId: session.user.id,
      },
    });
    if (existingVault) {
      return NextResponse.json(
        { error: "Vault with this name already exists" },
        { status: 400 },
      );
    }
    const vault = await prisma.vault.create({
      data: {
        name: data.name,
        ownerId: session.user.id,
        members: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    const result = GetVaultsResponseItem.parse(vault);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create vault" },
      { status: 400 },
    );
  }
}
