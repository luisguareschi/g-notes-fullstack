import { protectedSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ShareVaultBody, ShareVaultResponse } from "@/schemas/vaults";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * Share a vault
 * @description Shares a vault by creating an invitation
 * @body ShareVaultBody
 * @response ShareVaultResponse
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);

  if (!session) {
    return unauthorizedResponse;
  }

  let data: z.infer<typeof ShareVaultBody>;
  try {
    data = ShareVaultBody.parse(await req.json());
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

  const vaultKey = crypto.randomUUID().substring(0, 8);

  const keyDurationInMinutes = 10;

  await prisma.vaultInvitation.create({
    data: {
      vaultId: data.vaultId,
      vaultKey,
      expiresAt: new Date(Date.now() + 1000 * 60 * keyDurationInMinutes),
    },
  });

  try {
    const result = ShareVaultResponse.parse({ vaultKey });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to share vault" },
      { status: 400 },
    );
  }
}
