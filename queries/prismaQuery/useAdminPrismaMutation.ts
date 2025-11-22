import axios from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { PrismaModelName, PrismaArgs, PrismaResult } from "./config";
import { QUERY_KEYS } from "../queryKeys";

// Overloaded function signatures for type inference
export function useAdminPrismaMutation<
  M extends PrismaModelName,
  A extends "create" | "update" | "delete",
>(
  params: {
    model: M;
    action: A;
  },
  options?: {
    onSuccess?: (data: PrismaResult<M, A>) => void;
    onError?: (error: any) => void;
    invalidateQueries?: boolean;
  },
): {
  mutate: (
    mutationParams: Omit<PrismaArgs<M, A>, "select" | "include">,
  ) => void;
  mutateAsync: (
    mutationParams: Omit<PrismaArgs<M, A>, "select" | "include">,
  ) => Promise<PrismaResult<M, A>>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: PrismaResult<M, A> | undefined;
  error: any;
  reset: () => void;
};

// Implementation
export function useAdminPrismaMutation<
  M extends PrismaModelName,
  A extends "create" | "update" | "delete",
>(
  params: {
    model: M;
    action: A;
  },
  options?: {
    onSuccess?: (data: PrismaResult<M, A>) => void;
    onError?: (error: any) => void;
    invalidateQueries?: boolean;
  },
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, invalidateQueries = true } = options || {};

  return useMutation<
    PrismaResult<M, A>,
    any,
    Omit<PrismaArgs<M, A>, "select" | "include">
  >({
    mutationFn: async (mutationParams) => {
      // Convert model name to lowercase for the API
      const apiParams = {
        ...mutationParams,
        model: params.model.toLowerCase() as string,
        action: params.action,
      };

      try {
        const response = await axios.post("/api/admin/prisma", apiParams);
        return response.data as PrismaResult<M, A>;
      } catch (error: any) {
        console.error(error);
        const errorMessage =
          error?.response?.data?.error ?? "An unknown error occurred";
        toast.error(errorMessage);
        throw error;
      }
    },
    onSuccess: (data) => {
      // Invalidate related queries if enabled
      if (invalidateQueries) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.prismaQuery, { model: params.model }],
        });
      }
      const actionMessage = params.action + "ed";
      toast.success(`${params.model} ${actionMessage} successfully`);
      onSuccess?.(data);
    },
    onError: (error) => {
      toast.error(`${params.action} failed`);
      onError?.(error);
    },
  });
}
