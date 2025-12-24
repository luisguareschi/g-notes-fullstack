import { NextRequest, NextResponse } from "next/server";
import { protectedSession } from "@/lib/auth";
import { z } from "zod";
import prisma from "@/lib/prisma";

const GetAccountCredentialsQueryParams = z.object({
  vaultId: z.string().describe("Vault ID"),
  search: z.string().describe("Search").optional().nullable(),
  type: z.enum(["account", "bankAccount"]).optional().nullable(),
});

const GetAccountCredentialsResponseItem = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().nullable(),
  username: z.string().nullable(),
  password: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  bankAccount: z
    .object({
      id: z.string(),
    })
    .nullable(),
});

const GetAccountCredentialsResponse = z.array(
  GetAccountCredentialsResponseItem,
);

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
      password: true,
      notes: true,
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
