import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: Request) {
  try {
    // Ensure database is configured
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database not configured. Please set DATABASE_URL." },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Validate input
    const validatedData = registerSchema.parse(body);

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          full_name: validatedData.name,
        },
        emailRedirectTo: `${process.env.NEXTAUTH_URL}/auth/signin`,
      },
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    // Check if email confirmation is required
    const emailConfirmationRequired = !authData.session;

    // Generate username from email (before @ symbol)
    const username = validatedData.email.split('@')[0];

    // Create profile with the same ID as the auth user
    const profile = await prisma.profile.create({
      data: {
        id: authData.user.id,
        email: validatedData.email,
        fullName: validatedData.name,
        username: username,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        username: true,
        createdAt: true,
      },
    });

    console.log("User and profile created successfully:", profile.id);

    const message = emailConfirmationRequired
      ? "Account created! Please check your email to confirm your account before signing in."
      : "Account created successfully! You can now sign in.";

    return NextResponse.json(
      {
        message,
        requiresEmailConfirmation: emailConfirmationRequired,
        profile: {
          id: profile.id,
          fullName: profile.fullName,
          email: profile.email,
          createdAt: profile.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // Validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    // Prisma known request errors (e.g., unique constraint)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "Database request error. Please try again." },
        { status: 500 }
      );
    }

    // Prisma initialization / connection errors
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        {
          error:
            "Database connection failed. Check DATABASE_URL and migrations.",
        },
        { status: 500 }
      );
    }

    console.error("Registration error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
