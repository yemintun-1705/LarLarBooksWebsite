import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

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

    // Check if user already exists
    const existingProfile = await prisma.profile.findUnique({
      where: { email: validatedData.email },
    });

    if (existingProfile) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: validatedData.email,
      password: validatedData.password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name: validatedData.name,
      }
    });

    if (authError || !authData.user) {
      console.error("Supabase auth error:", authError);
      return NextResponse.json(
        { error: authError?.message || "Failed to create user" },
        { status: 400 }
      );
    }

    // Generate username from email (before @ symbol)
    const username = validatedData.email.split("@")[0];

    // Create or update profile
    const result = await prisma.profile.upsert({
      where: { id: authData.user.id },
      update: {
        email: validatedData.email,
        fullName: validatedData.name,
        username: username,
      },
      create: {
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

    console.log("User and profile created successfully:", result.id);

    return NextResponse.json(
      {
        message: "Account created successfully! You can now sign in.",
        requiresEmailConfirmation: false,
        profile: {
          id: result.id,
          fullName: result.fullName,
          email: result.email,
          createdAt: result.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // Validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
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
