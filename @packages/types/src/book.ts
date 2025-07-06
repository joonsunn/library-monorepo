export type BookEdition = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isbn: string;
  title: string;
  author: string;
  bookCopies: BookCopy[];
};

export type BookCopy = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  editionId: string;
  status: string extends BookCopyStatus ? BookCopyStatus : string;
};

export const BookCopyStatus = {
  AVAILABLE: 'AVAILABLE',
  CHECKED_OUT: 'CHECKED_OUT',
  RESERVED: 'RESERVED',
  NOT_AVAILABLE: 'NOT_AVAILABLE',
} as const;

export type BookCopyStatus =
  (typeof BookCopyStatus)[keyof typeof BookCopyStatus];

export type BookLoan = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status?: string;
  borrowerId: string;
  bookCopyId: string;
  returnedAt: Date | null;
};
