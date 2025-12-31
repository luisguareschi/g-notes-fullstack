import { protectedSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { RemoveMemberFromVaultBody } from "@/schemas/vaults";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

/**
 * Remove a member from a vault
 * @description Removes a member from a vault by vault ID and user ID
 * @body RemoveMemberFromVaultBody
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);

  if (!session) {
    return unauthorizedResponse;
  }

  let data: z.infer<typeof RemoveMemberFromVaultBody>;
  try {
    data = RemoveMemberFromVaultBody.parse(await req.json());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid vault data" }, { status: 400 });
  }

  const vault = await prisma.vault.findUnique({
    where: {
      id: data.vaultId,
    },
  });

  if (!vault) {
    return NextResponse.json({ error: "Vault not found" }, { status: 404 });
  }

  if (vault.ownerId === data.userId) {
    return NextResponse.json(
      { error: "You cannot remove the owner from the vault" },
      { status: 403 },
    );
  }

  await prisma.vault.update({
    where: { id: data.vaultId },
    data: { members: { disconnect: { id: data.userId } } },
  });

  return NextResponse.json({ status: 200 });
}
