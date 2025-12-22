import { AxiosError } from "axios";

export const parsePrismaError = (error: unknown, fallback?: string) => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.error || fallback || "An unknown error occurred"
    );
  }
  return fallback || "An unknown error occurred";
};
