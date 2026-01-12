import z from "zod";

export const GetAccountCredentialsQueryParams = z.object({
  vaultId: z.string().describe("Vault ID"),
  search: z.string().describe("Search").optional().nullable(),
  type: z.enum(["account", "bankAccount"]).optional().nullable(),
  orderBy: z
    .enum(["updatedAt", "createdAt", "name"])
    .optional()
    .nullable()
    .default("updatedAt"),
  orderDirection: z.enum(["asc", "desc"]).optional().nullable().default("desc"),
  limit: z.coerce.number().describe("Limit").optional().nullable(),
});

export const GetAccountCredentialsResponseItem = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().nullable(),
  username: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  bankAccount: z
    .object({
      id: z.string(),
    })
    .nullable(),
});

export const GetAccountCredentialsResponse = z.array(
  GetAccountCredentialsResponseItem,
);

export const CreateAccountCredentialsBody = z.object({
  vaultId: z.string().describe("Vault ID"),
  name: z.string().describe("Name").nonempty("Name is required"),
  email: z.string().describe("Email").optional().nullable(),
  username: z.string().describe("Username").optional().nullable(),
  password: z.string().describe("Password").optional().nullable(),
  notes: z.string().describe("Notes").optional().nullable(),
  bankAccount: z
    .object({
      bankName: z.string().describe("Bank Name"),
      owners: z.array(z.string()).describe("Owners"),
      beneficiaries: z.array(z.string()).describe("Beneficiaries"),
      accountNumber: z
        .string()
        .describe("Account Number")
        .optional()
        .nullable(),
      aba: z.string().describe("ABA").optional().nullable(),
      swift: z.string().describe("SWIFT").optional().nullable(),
      bankAddress: z.string().describe("Bank Address").optional().nullable(),
      beneficiaryAddress: z
        .string()
        .describe("Beneficiary Address")
        .optional()
        .nullable(),
    })
    .optional()
    .nullable(),
});

export const GetAccountCredentialsPathParams = z.object({
  id: z.string().describe("Account Credentials ID"),
});

export const GetAccountCredentialsDetailsResponse = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().nullable(),
  username: z.string().nullable(),
  password: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  vaultId: z.string(),
  bankAccount: z
    .object({
      id: z.string(),
      accountNumber: z.string().nullable(),
      aba: z.string().nullable(),
      swift: z.string().nullable(),
      bankName: z.string().nullable(),
      bankAddress: z.string().nullable(),
      beneficiaryAddress: z.string().nullable(),
      owners: z.array(z.string()),
      beneficiaries: z.array(z.string()),
    })
    .nullable(),
});
