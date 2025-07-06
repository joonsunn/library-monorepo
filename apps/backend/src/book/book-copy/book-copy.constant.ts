export const BookCopyStatus = {
  AVAILABLE: 'AVAILABLE',
  CHECKED_OUT: 'CHECKED_OUT',
  RESERVED: 'RESERVED',
  NOT_AVAILABLE: 'NOT_AVAILABLE',
} as const;

export type BookCopyStatus =
  (typeof BookCopyStatus)[keyof typeof BookCopyStatus];
