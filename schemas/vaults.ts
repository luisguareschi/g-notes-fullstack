import z from "zod";

export const GetVaultsResponseItem = z.object({
  id: z.string(),
  name: z.string(),
  ownerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const GetVaultsResponse = z.array(GetVaultsResponseItem);

export const CreateVaultBody = z.object({
  name: z.string().min(1, "Name is required"),
});

export const ShareVaultBody = z.object({
  vaultId: z.string().describe("Vault ID"),
});

export const ShareVaultResponse = z.object({
  vaultKey: z.string().describe("Vault Key"),
});

export const RemoveMemberFromVaultBody = z.object({
  vaultId: z.string().describe("Vault ID"),
  userId: z.string().describe("User ID"),
});

export const JoinVaultBody = z.object({
  vaultKey: z.string().describe("Vault Key"),
});

export const JoinVaultResponse = z.object({
  id: z.string(),
  name: z.string(),
});

export const GetVaultPathParams = z.object({
  id: z.string().describe("Vault ID"),
});

export const GetVaultResponse = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string().nullable(),
    name: z.string(),
  }),
  members: z.array(
    z.object({
      id: z.string(),
      email: z.string(),
      username: z.string().nullable(),
      name: z.string(),
    }),
  ),
});
