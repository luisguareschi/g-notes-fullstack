import { AES, enc } from "crypto-js";

export const encrypt = (text: string | null | undefined) => {
  const key = process.env.BETTER_AUTH_SECRET;
  if (!key) {
    throw new Error("BETTER_AUTH_SECRET environment variable is not set");
  }
  if (!text) return null;
  return AES.encrypt(text, key).toString();
};

export const decrypt = (text: string | null | undefined) => {
  const key = process.env.BETTER_AUTH_SECRET;
  if (!key) {
    throw new Error("BETTER_AUTH_SECRET environment variable is not set");
  }
  if (!text) return null;
  return AES.decrypt(text, key).toString(enc.Utf8);
};
