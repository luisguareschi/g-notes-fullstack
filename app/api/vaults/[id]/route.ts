import { protectedSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { GetVaultPathParams, GetVaultResponse } from "@/schemas/vaults";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

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

/**
 * Delete a vault
 * @description Deletes a vault by ID
 * @pathParams GetVaultPathParams
 */
export async function DELETE(
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
    },
    select: {
      ownerId: true,
    },
  });

  if (!vault) {
    return NextResponse.json({ error: "Vault not found" }, { status: 404 });
  }

  if (vault.ownerId !== session.user.id) {
    return NextResponse.json(
      { error: "You are not the owner of this vault" },
      { status: 403 },
    );
  }

  await prisma.vault.delete({
    where: { id },
  });

  return NextResponse.json({ status: 200 });
}
