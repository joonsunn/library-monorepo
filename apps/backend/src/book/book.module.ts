import { Module } from '@nestjs/common';
import { BookEditionModule } from './book-edition/book-edition.module';
import { BookCopyModule } from './book-copy/book-copy.module';
import { BookLoanModule } from './book-loan/book-loan.module';

@Module({
  imports: [BookEditionModule, BookCopyModule, BookLoanModule],
})
export class BookModule {}
