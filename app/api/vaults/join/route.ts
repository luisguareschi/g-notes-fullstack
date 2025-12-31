import { protectedSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { JoinVaultBody, JoinVaultResponse } from "@/schemas/vaults";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

/**
 * Join a vault
 * @description Joins a vault by vault key
 * @body JoinVaultBody
 * @response JoinVaultResponse
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);

  if (!session) {
    return unauthorizedResponse;
  }

  let data: z.infer<typeof JoinVaultBody>;
  try {
    data = JoinVaultBody.parse(await req.json());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid vault data" }, { status: 400 });
  }

  const vaultInvitation = await prisma.vaultInvitation.findFirst({
    where: {
      vaultKey: data.vaultKey,
    },
    orderBy: {
      expiresAt: "desc",
    },
  });

  if (!vaultInvitation) {
    return NextResponse.json({ error: "Invalid vault key" }, { status: 400 });
  }

  if (vaultInvitation.expiresAt < new Date()) {
    return NextResponse.json({ error: "Vault key expired" }, { status: 400 });
  }

  const vault = await prisma.vault.update({
    where: { id: vaultInvitation.vaultId },
    data: { members: { connect: { id: session.user.id } } },
    select: {
      id: true,
      name: true,
    },
  });

  try {
    const result = JoinVaultResponse.parse(vault);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid vault data" }, { status: 400 });
  }
}
