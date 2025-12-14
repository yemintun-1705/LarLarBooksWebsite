// TypeScript type definitions for the application
import { Prisma } from '@prisma/client';

// ============================================================================
// Base Model Types
// ============================================================================

export type Profile = Prisma.ProfileGetPayload<{}>;
export type User = Prisma.usersGetPayload<{}>;
export type Author = Prisma.AuthorGetPayload<{}>;
export type Publisher = Prisma.PublisherGetPayload<{}>;
export type Genre = Prisma.GenreGetPayload<{}>;
export type Book = Prisma.BookGetPayload<{}>;
export type BookGenre = Prisma.BookGenreGetPayload<{}>;
export type BookPublisher = Prisma.BookPublisherGetPayload<{}>;
export type BookContent = Prisma.BookContentGetPayload<{}>;
export type Review = Prisma.ReviewGetPayload<{}>;
export type Comment = Prisma.CommentGetPayload<{}>;
export type ReadingProgress = Prisma.ReadingProgressGetPayload<{}>;
export type UserLibrary = Prisma.UserLibraryGetPayload<{}>;

// ============================================================================
// Extended Types with Relations
// ============================================================================

export type BookWithRelations = Prisma.BookGetPayload<{
  include: {
    author: true;
    bookGenres: {
      include: {
        genre: true;
      };
    };
    bookPublishers: {
      include: {
        publisher: true;
      };
    };
  };
}>;

export type BookWithFullRelations = Prisma.BookGetPayload<{
  include: {
    author: true;
    bookGenres: {
      include: {
        genre: true;
      };
    };
    bookPublishers: {
      include: {
        publisher: true;
      };
    };
    bookContent: true;
    reviews: {
      include: {
        user: true;
      };
    };
    comments: {
      include: {
        user: true;
      };
    };
  };
}>;

export type AuthorWithBooks = Prisma.AuthorGetPayload<{
  include: {
    books: true;
  };
}>;

export type PublisherWithBooks = Prisma.PublisherGetPayload<{
  include: {
    bookPublishers: {
      include: {
        book: true;
      };
    };
  };
}>;

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface BooksResponse extends PaginatedResponse<BookWithRelations> {
  books: BookWithRelations[];
}

export interface AuthorsResponse extends PaginatedResponse<Author> {
  authors: Author[];
}

export interface PublishersResponse extends PaginatedResponse<Publisher> {
  publishers: Publisher[];
}

// ============================================================================
// Form/Input Types
// ============================================================================

export interface CreateBookInput {
  bookName: string;
  description?: string;
  authorId?: string;
  genreIds?: string[];
  publisherIds?: string[];
  isbn?: string;
  pageCount?: number;
  language?: string;
  price?: number;
  publicationDate?: Date | string;
  bookCoverPath?: string;
  status?: string;
}

export interface UpdateBookInput extends Partial<CreateBookInput> {
  id: string;
}

export interface CreateAuthorInput {
  name: string;
  contactEmail?: string;
  website?: string;
  userId?: string;
}

export interface CreatePublisherInput {
  name: string;
  contactEmail?: string;
  website?: string;
}

export interface CreateReviewInput {
  bookId: string;
  userId: string;
  rating: number;
  reviewText?: string;
}

export interface CreateCommentInput {
  bookId: string;
  userId: string;
  commentText: string;
}
