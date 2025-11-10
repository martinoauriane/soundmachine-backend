import { hash, compare } from "bcrypt-ts";
export async function hash_pwd(password) {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
}
export async function verifyPassword(password, hash) {
    const isMatch = await compare(password, hash);
    return isMatch;
}
