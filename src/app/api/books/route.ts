// API routes for Books
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/books - Get all books with relations
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const search = searchParams.get("search") || "";

    const where = search
      ? {
          OR: [
            { bookName: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        take: limit,
        skip: offset,
        include: {
          author: true, // Author of the book
          bookGenres: {
            include: {
              genre: true,
            },
          },
          bookPublishers: {
            include: {
              publisher: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.book.count({ where }),
    ]);

    // Convert BigInt IDs to strings for JSON serialization
    const booksWithConvertedIds = books.map(book => ({
      ...book,
      bookGenres: book.bookGenres.map(bg => ({
        ...bg,
        id: bg.id.toString(),
      })),
      bookPublishers: book.bookPublishers.map(bp => ({
        ...bp,
        id: bp.id.toString(),
      })),
    }));

    return NextResponse.json({
      success: true,
      books: booksWithConvertedIds,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error: any) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/books - Create a new book
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookName, description, authorId, genreIds, publisherIds, ...rest } =
      body;

    // Create book with relations
    const book = await prisma.book.create({
      data: {
        bookName,
        description,
        authorId,
        ...rest,
        bookGenres: genreIds
          ? {
              create: genreIds.map((genreId: string) => ({
                genreId,
              })),
            }
          : undefined,
        bookPublishers: publisherIds
          ? {
              create: publisherIds.map((publisherId: string) => ({
                publisherId,
              })),
            }
          : undefined,
      },
      include: {
        author: true,
        bookGenres: {
          include: {
            genre: true,
          },
        },
        bookPublishers: {
          include: {
            publisher: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, book }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
