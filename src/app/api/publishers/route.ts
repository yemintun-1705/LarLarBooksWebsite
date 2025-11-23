// API routes for Publishers
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/publishers - Get all publishers
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search") || "";

    const where = search
      ? {
          OR: [
            { publisherName: { contains: search, mode: "insensitive" as const } },
            { contactEmail: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [publishers, total] = await Promise.all([
      prisma.publisher.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: {
          publisherName: "asc",
        },
      }),
      prisma.publisher.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      publishers,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error: any) {
    console.error("Error fetching publishers:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/publishers - Create a new publisher
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { publisherName, contactEmail, website } = body;

    if (!publisherName) {
      return NextResponse.json(
        { success: false, error: "Publisher name is required" },
        { status: 400 }
      );
    }

    const publisher = await prisma.publisher.create({
      data: {
        publisherName,
        contactEmail,
        website,
      },
    });

    return NextResponse.json({ success: true, publisher }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating publisher:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
