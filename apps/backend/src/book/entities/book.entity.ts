import { Book as BookEntity } from '@prisma/client';
export class Book implements BookEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isbn: string;
  title: string;
  author: string;
}
