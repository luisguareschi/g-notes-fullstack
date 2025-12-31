import { NextRequest, NextResponse } from "next/server";
import { protectedSession } from "@/lib/auth";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/cryptography";
import {
  GetAccountCredentialsQueryParams,
  GetAccountCredentialsResponse,
  GetAccountCredentialsResponseItem,
  CreateAccountCredentialsBody,
} from "@/schemas/account-credentials";

/**
 * Get all account credentials
 * @description Fetches all account credentials for the current user
 * @params GetAccountCredentialsQueryParams
 * @response GetAccountCredentialsResponse
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);

  if (!session) {
    return unauthorizedResponse;
  }

  let data: z.infer<typeof GetAccountCredentialsQueryParams>;
  try {
    data = GetAccountCredentialsQueryParams.parse(
      Object.fromEntries(req.nextUrl.searchParams),
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid query params" },
      { status: 400 },
    );
  }

  const accountCredentials = await prisma.accountCredentials.findMany({
    where: {
      vaultId: data.vaultId,
      ...(data.search
        ? {
            OR: [
              { name: { contains: data.search, mode: "insensitive" } },
              { email: { contains: data.search, mode: "insensitive" } },
              { username: { contains: data.search, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(data.type === "bankAccount" && {
        bankAccount: {
          isNot: null,
        },
      }),
      ...(data.type === "account" && {
        bankAccount: {
          is: null,
        },
      }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      createdAt: true,
      updatedAt: true,
      bankAccount: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  try {
    const result = GetAccountCredentialsResponse.parse(accountCredentials);
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
 * Create a new account credentials
 * @description Creates a new account credentials for the current user
 * @body CreateAccountCredentialsBody
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { session, unauthorizedResponse } = await protectedSession(req);

  if (!session) {
    return unauthorizedResponse;
  }

  let data: z.infer<typeof CreateAccountCredentialsBody>;
  try {
    data = CreateAccountCredentialsBody.parse(await req.json());
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid account credentials data" },
      { status: 400 },
    );
  }

  try {
    const accountCredentials = await prisma.accountCredentials.create({
      data: {
        ...data,
        password: encrypt(data.password),
        bankAccount: {
          create: {
            ...data.bankAccount,
            accountNumber: encrypt(data.bankAccount?.accountNumber),
            aba: encrypt(data.bankAccount?.aba),
            swift: encrypt(data.bankAccount?.swift),
          },
        },
      },
    });
    const result = GetAccountCredentialsResponseItem.parse(accountCredentials);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create account credentials" },
      { status: 400 },
    );
  }
}
