// API routes for Authors
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/authors - Get all authors
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search") || "";

    const where = search
      ? {
          OR: [
            { authorName: { contains: search, mode: "insensitive" as const } },
            { authorProfileImageUrl: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [authors, total] = await Promise.all([
      prisma.author.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: {
          authorName: "asc",
        },
      }),
      prisma.author.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      authors,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error: any) {
    console.error("Error fetching authors:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/authors - Create a new author
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { authorName, authorProfileImageUrl, userId } = body;

    if (!authorName) {
      return NextResponse.json(
        { success: false, error: "Author name is required" },
        { status: 400 }
      );
    }

    const author = await prisma.author.create({
      data: {
        authorName,
        authorProfileImageUrl,
        userId,
      },
    });

    return NextResponse.json({ success: true, author }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating author:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
