import { useMutation, useQuery } from "@tanstack/react-query";
import { createAuthClient, ErrorContext } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

export type UseSignInProps = {
  onSuccess: () => void;
  onError: (error: ErrorContext) => void;
};

export const useSignIn = ({ onSuccess, onError }: UseSignInProps) => {
  return useMutation({
    mutationFn: async (params: Parameters<typeof signIn.email>[0]) => {
      const { data } = await signIn.email(params, {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          onError(error);
        },
      });
      return data;
    },
  });
};

export type UseSignUpProps = {
  onSuccess: () => void;
  onError: (error: ErrorContext) => void;
};

export const useSignUp = ({ onSuccess, onError }: UseSignUpProps) => {
  return useMutation({
    mutationFn: async (params: Parameters<typeof signUp.email>[0]) => {
      const { data } = await signUp.email(params, {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          onError(error);
        },
      });
      return data;
    },
  });
};
