import { BookCopy as BookCopyEntity } from '@prisma/client';

export class BookCopy implements BookCopyEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  editionId: string;
}
