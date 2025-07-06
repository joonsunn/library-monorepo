import { Module } from '@nestjs/common';
import { BookLoanService } from './book-loan.service';
import { BookLoanController } from './book-loan.controller';
import { BookLoanRepository } from './book-loan.repository';
import { BookCopyModule } from '../book-copy/book-copy.module';

@Module({
  controllers: [BookLoanController],
  providers: [BookLoanService, BookLoanRepository],
  imports: [BookCopyModule],
})
export class BookLoanModule {}
