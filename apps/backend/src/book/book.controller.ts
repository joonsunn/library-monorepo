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
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { QueryBookDto } from './dto/query-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() dto: CreateBookDto) {
    const result = await this.bookService.create(dto);

    return result;
  }

  @Get()
  async findAll(@Query() query: QueryBookDto) {
    const result = await this.bookService.findAll(query);

    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.bookService.findOne(id);

    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    const result = await this.bookService.update(id, dto);

    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.bookService.remove(id);

    return result;
  }
}
