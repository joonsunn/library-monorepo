import { BookCopy as BookCopyEntity } from '@prisma/client';
import { BookCopyStatus } from '../book-copy.constant';

export class BookCopy implements BookCopyEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  editionId: string;
  status: string extends BookCopyStatus ? BookCopyStatus : string;
}
