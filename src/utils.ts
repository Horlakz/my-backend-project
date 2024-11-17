import jwt from "jsonwebtoken";

export function createToken(id: number) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id: 1 }, secret, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.verify(token, secret);
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
