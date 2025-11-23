// API routes for Genres
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/genres - Get all genres
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search") || "";

    const where = search
      ? {
          genreName: { contains: search, mode: "insensitive" as const },
        }
      : {};

    const [genres, total] = await Promise.all([
      prisma.genre.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: {
          genreName: "asc",
        },
      }),
      prisma.genre.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      genres,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error: any) {
    console.error("Error fetching genres:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/genres - Create a new genre
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { genreName } = body;

    if (!genreName) {
      return NextResponse.json(
        { success: false, error: "Genre name is required" },
        { status: 400 }
      );
    }

    const genre = await prisma.genre.create({
      data: {
        genreName,
      },
    });

    return NextResponse.json({ success: true, genre }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating genre:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
