import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Session } from "@/types";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-in-production"
);

const COOKIE_NAME = "ux-copilot-session";

export async function createSession(session: Session): Promise<string> {
  const token = await new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(JWT_SECRET);

  return token;
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}

export function setSessionCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  };
}

export function clearSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 0,
    path: "/",
  };
}

// Simple in-memory user store for MVP (swap for DB later)
interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

const users: Map<string, StoredUser> = new Map();

export function getUserByEmail(email: string): StoredUser | undefined {
  return Array.from(users.values()).find((u) => u.email === email);
}

export function createUser(user: StoredUser): void {
  users.set(user.id, user);
}

export function getUserById(id: string): StoredUser | undefined {
  return users.get(id);
}
