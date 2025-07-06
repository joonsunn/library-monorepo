import { BookLoan as BookLoanEntity } from '@prisma/client';

export class BookLoan implements BookLoanEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status?: string;
  borrowerId: string;
  bookCopyId: string;
  returnedAt: Date | null;
}
