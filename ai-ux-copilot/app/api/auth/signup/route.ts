import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession, setSessionCookie, getUserByEmail, createUser } from "@/lib/auth";
import { generateId } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Input validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Create user
    const passwordHash = await bcrypt.hash(password, 12);
    const userId = generateId();

    createUser({
      id: userId,
      email,
      name,
      passwordHash,
    });

    // Create session
    const token = await createSession({
      userId,
      email,
      name,
    });

    const cookie = setSessionCookie(token);
    const response = NextResponse.json({ success: true });
    response.cookies.set(cookie);

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
