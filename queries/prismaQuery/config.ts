import { Prisma } from "@/app/generated/prisma";

/**
 * Extract model name type from Prisma.ModelName
 * This automatically includes all models defined in your Prisma schema.
 *
 * When you add a new model to your Prisma schema and run `prisma generate`,
 * it will automatically be available here - no manual updates needed!
 */
export type PrismaModelName = Prisma.ModelName;

/**
 * Helper type to extract the args type from Prisma's TypeMap.
 * This automatically works for any model in your Prisma schema.
 *
 * Example:
 * - PrismaArgs<"User", "findMany"> resolves to Prisma.UserFindManyArgs
 * - PrismaArgs<"User", "create"> resolves to Prisma.UserCreateArgs
 * - PrismaArgs<"User", "update"> resolves to Prisma.UserUpdateArgs
 * - PrismaArgs<"User", "delete"> resolves to Prisma.UserDeleteArgs
 *
 * @template M - The model name (e.g., "User", "Session", etc.)
 * @template A - The action type ("findMany" | "findUnique" | "create" | "update" | "delete")
 */
export type PrismaArgs<
  M extends PrismaModelName,
  A extends "findMany" | "findUnique" | "create" | "update" | "delete",
> = Prisma.TypeMap["model"][M]["operations"][A]["args"];

/**
 * Helper type to extract the result type from Prisma's TypeMap.
 * This automatically works for any model in your Prisma schema.
 *
 * Example:
 * - PrismaResult<"User", "findMany"> resolves to User[]
 * - PrismaResult<"User", "findUnique"> resolves to User | null
 * - PrismaResult<"User", "create"> resolves to User
 * - PrismaResult<"User", "update"> resolves to User
 * - PrismaResult<"User", "delete"> resolves to User
 *
 * @template M - The model name (e.g., "User", "Session", etc.)
 * @template A - The action type ("findMany" | "findUnique" | "create" | "update" | "delete")
 */
export type PrismaResult<
  M extends PrismaModelName,
  A extends "findMany" | "findUnique" | "create" | "update" | "delete",
> = Prisma.TypeMap["model"][M]["operations"][A]["result"];
