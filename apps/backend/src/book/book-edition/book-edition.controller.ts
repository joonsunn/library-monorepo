import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookEditionService } from './book-edition.service';
import { CreateBookEditionDto } from './dto/create-book-edition.dto';
import { UpdateBookEditionDto } from './dto/update-book-edition.dto';
import { QueryBookEditionDto } from './dto/query-book-edition.dto';

@Controller('book-edition')
export class BookEditionController {
  constructor(private readonly bookEditionService: BookEditionService) {}

  @Post()
  async create(@Body() dto: CreateBookEditionDto) {
    const result = await this.bookEditionService.create(dto);

    return result;
  }

  @Get()
  async findAll(@Query() query: QueryBookEditionDto) {
    const result = await this.bookEditionService.findAll(query);

    return result;
  }

  @Get('/by-isbn/:isbn')
  async findOneByISBN(@Param('isbn') isbn: string) {
    const result = await this.bookEditionService.findOneByISBN(isbn);

    return result;
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const result = await this.bookEditionService.findOneById(id);

    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBookEditionDto) {
    const result = await this.bookEditionService.update(id, dto);

    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.bookEditionService.remove(id);

    return result;
  }
}
