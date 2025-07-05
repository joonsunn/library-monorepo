import { Borrower as BorrowerEntity } from '@prisma/client';

export class Borrower implements BorrowerEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
}
