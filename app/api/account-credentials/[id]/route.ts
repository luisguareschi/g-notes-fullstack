import { protectedSession } from "@/lib/auth";
import { decrypt } from "@/lib/cryptography";
import prisma from "@/lib/prisma";
import {
  GetAccountCredentialsPathParams,
  GetAccountCredentialsDetailsResponse,
} from "@/schemas/account-credentials";
import { NextRequest, NextResponse } from "next/server";

const canUserAccessAccountCredentials = async (
  accountVaultId: string,
  userId: string,
): Promise<boolean> => {
  const userVaults = await prisma.vault.findMany({
    where: {
      OR: [
        { ownerId: { equals: userId } },
        { members: { some: { id: userId } } },
      ],
    },
  });

  if (!userVaults.some((vault) => vault.id === accountVaultId)) {
    return false;
  }

  return true;
};

/**
 * Get account credentials by ID
 * @description Fetches account credentials information by ID
 * @pathParams GetAccountCredentialsPathParams
 * @response GetAccountCredentialsDetailsResponse
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);
  if (!session) {
    return unauthorizedResponse;
  }

  const { id } = GetAccountCredentialsPathParams.parse(params);
  if (!id) {
    return NextResponse.json(
      { error: "Account Credentials ID is required" },
      { status: 400 },
    );
  }

  let accountCredentials = await prisma.accountCredentials.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      password: true,
      notes: true,
      createdAt: true,
      updatedAt: true,
      vaultId: true,
      bankAccount: {
        select: {
          id: true,
          accountNumber: true,
          aba: true,
          swift: true,
          bankName: true,
          bankAddress: true,
          beneficiaryAddress: true,
          owners: true,
          beneficiaries: true,
        },
      },
    },
  });

  if (!accountCredentials) {
    return NextResponse.json(
      { error: "Account Credentials not found" },
      { status: 404 },
    );
  }

  const canAccess = await canUserAccessAccountCredentials(
    accountCredentials?.vaultId,
    session.user.id,
  );

  if (!canAccess) {
    return NextResponse.json(
      { error: "You are not authorized to access this account credentials" },
      { status: 403 },
    );
  }

  accountCredentials = {
    ...accountCredentials,
    password: decrypt(accountCredentials.password),
    bankAccount: accountCredentials.bankAccount
      ? {
          ...accountCredentials.bankAccount,
          accountNumber: decrypt(accountCredentials.bankAccount.accountNumber),
          aba: decrypt(accountCredentials.bankAccount.aba),
          swift: decrypt(accountCredentials.bankAccount.swift),
        }
      : null,
  };

  try {
    const result =
      GetAccountCredentialsDetailsResponse.parse(accountCredentials);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid account credentials data" },
      { status: 400 },
    );
  }
}

/**
 * Delete account credentials by ID
 * @description Deletes account credentials by ID
 * @pathParams GetAccountCredentialsPathParams
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);
  if (!session) {
    return unauthorizedResponse;
  }

  const { id } = GetAccountCredentialsPathParams.parse(params);
  if (!id) {
    return NextResponse.json(
      { error: "Account Credentials ID is required" },
      { status: 400 },
    );
  }

  const accountCredentials = await prisma.accountCredentials.findUnique({
    where: { id },
  });

  if (!accountCredentials) {
    return NextResponse.json(
      { error: "Account Credentials not found" },
      { status: 404 },
    );
  }

  const canAccess = await canUserAccessAccountCredentials(
    accountCredentials?.vaultId,
    session.user.id,
  );

  if (!canAccess) {
    return NextResponse.json(
      { error: "You are not authorized to access this account credentials" },
      { status: 403 },
    );
  }

  await prisma.accountCredentials.delete({
    where: { id },
  });

  return NextResponse.json({ status: 200 });
}
