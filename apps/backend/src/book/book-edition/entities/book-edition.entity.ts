import { BookEdition as BookEditionEntity } from '@prisma/client';
export class BookEdition implements BookEditionEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isbn: string;
  title: string;
  author: string;
}
