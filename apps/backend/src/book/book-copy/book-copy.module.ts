import { Module } from '@nestjs/common';
import { BookCopyService } from './book-copy.service';
import { BookCopyController } from './book-copy.controller';
import { BookCopyRepository } from './book-copy.repository';
import { BookEditionModule } from '../book-edition/book-edition.module';

@Module({
  imports: [BookEditionModule],
  controllers: [BookCopyController],
  providers: [BookCopyService, BookCopyRepository],
})
export class BookCopyModule {}
