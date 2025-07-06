import { Module } from '@nestjs/common';
import { BookEditionService } from './book-edition.service';
import { BookEditionController } from './book-edition.controller';
import { BookEditionRepository } from './book-edition.repository';

@Module({
  controllers: [BookEditionController],
  providers: [BookEditionService, BookEditionRepository],
})
export class BookEditionModule {}
