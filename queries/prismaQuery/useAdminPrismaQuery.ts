import axios from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { PrismaModelName, PrismaArgs, PrismaResult } from "./config";
import { QUERY_KEYS } from "../queryKeys";

// Overloaded function signatures for type inference
export function useAdminPrismaQuery<
  M extends PrismaModelName,
  A extends "findMany" | "findUnique",
>(
  params: {
    model: M;
    action: A;
  } & Omit<PrismaArgs<M, A>, "select" | "include">,
): ReturnType<typeof useQuery<PrismaResult<M, A> | undefined>>;

// Implementation
export function useAdminPrismaQuery<
  M extends PrismaModelName,
  A extends "findMany" | "findUnique",
>(
  params: {
    model: M;
    action: A;
  } & Omit<PrismaArgs<M, A>, "select" | "include">,
) {
  // Convert model name to lowercase for the API
  const apiParams = {
    ...params,
    model: params.model.toLowerCase() as string,
  };

  return useQuery<PrismaResult<M, A> | undefined>({
    queryKey: [QUERY_KEYS.prismaQuery, params],
    queryFn: async () => {
      try {
        const response = await axios.post("/api/admin/prisma", apiParams);
        return response.data as PrismaResult<M, A>;
      } catch (error: any) {
        console.error(error);
        toast.error(
          error?.response?.data?.error ?? "An unknown error occurred",
        );
        return undefined;
      }
    },
  });
}
