import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export const protectedSession = async (req: NextRequest) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  const unauthorizedResponse = NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 },
  );

  return {
    session,
    unauthorizedResponse,
  };
};

export const protectedAdminSession = async (req: NextRequest) => {
  let session = await auth.api.getSession({
    headers: req.headers,
  });
  const unauthorizedResponse = NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 },
  );

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        role: true,
        email: true,
      },
    });
    if (user?.role !== "ADMIN") {
      session = null;
    }
  }

  return {
    session,
    unauthorizedResponse,
  };
};
