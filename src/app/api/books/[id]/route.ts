// API route for individual book
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const book = await prisma.book.findUnique({
      where: { id },
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

    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 }
      );
    }

    // Convert BigInt IDs to strings
    const bookWithConvertedIds = {
      ...book,
      bookGenres: book.bookGenres.map(bg => ({
        ...bg,
        id: bg.id.toString(),
      })),
      bookPublishers: book.bookPublishers.map(bp => ({
        ...bp,
        id: bp.id.toString(),
      })),
    };

    return NextResponse.json({ success: true, book: bookWithConvertedIds });
  } catch (error: any) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { chapters, status } = body;

    const book = await prisma.book.update({
      where: { id },
      data: {
        status: status || undefined,
        // Note: chapters would need a separate table/relation to store properly
        // For now, we're just updating the status
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

    // Convert BigInt IDs to strings
    const bookWithConvertedIds = {
      ...book,
      bookGenres: book.bookGenres.map(bg => ({
        ...bg,
        id: bg.id.toString(),
      })),
      bookPublishers: book.bookPublishers.map(bp => ({
        ...bp,
        id: bp.id.toString(),
      })),
    };

    return NextResponse.json({ success: true, book: bookWithConvertedIds });
  } catch (error: any) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
