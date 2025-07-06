import { Module } from '@nestjs/common';
import { BookEditionModule } from './book-edition/book-edition.module';
import { BookCopyModule } from './book-copy/book-copy.module';

@Module({
  imports: [BookEditionModule, BookCopyModule],
})
export class BookModule {}
