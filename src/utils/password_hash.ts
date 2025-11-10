import { hash, compare } from "bcrypt-ts";

export async function hash_pwd(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const isMatch = await compare(password, hash);
  return isMatch;
}
