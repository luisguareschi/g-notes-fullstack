import z from "zod";

export const GetUsersReponse = z.array(
  z.object({
    id: z.string(),
    email: z.email(),
    username: z.string().nullable(),
    name: z.string(),
  }),
);

export const MeResponse = z.object({
  user: z.object({
    id: z.string(),
    email: z.email(),
    username: z.string().nullable(),
    name: z.string(),
  }),
});

export const GetUserPathParams = z.object({
  id: z.string().describe("User ID"),
});

export const GetUserResponse = z.object({
  user: z.object({
    id: z.string(),
    email: z.email(),
    username: z.string().nullable(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});
