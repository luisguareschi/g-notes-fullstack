import { AES, enc } from "crypto-js";

const encrypt = (text: string, key: string) => {
  return AES.encrypt(text, key).toString();
};

const decrypt = (text: string, key: string) => {
  return AES.decrypt(text, key).toString(enc.Utf8);
};
