import { Module } from '@nestjs/common';
import { BookEditionModule } from './book-edition/book-edition.module';

@Module({
  imports: [BookEditionModule],
})
export class BookModule {}
