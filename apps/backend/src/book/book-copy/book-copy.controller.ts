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
import { BookCopyService } from './book-copy.service';
import { CreateBookCopyDto } from './dto/create-book-copy.dto';
import { UpdateBookCopyDto } from './dto/update-book-copy.dto';
import { QueryBookCopyDto } from './dto/query-book-copy.dto';

@Controller('book-copy')
export class BookCopyController {
  constructor(private readonly bookCopyService: BookCopyService) {}

  @Post()
  async create(@Body() dto: CreateBookCopyDto) {
    const result = await this.bookCopyService.create(dto);
    return result;
  }

  @Get()
  async findAll(@Query() query: QueryBookCopyDto) {
    const result = await this.bookCopyService.findAll(query);

    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.bookCopyService.findOne(id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBookCopyDto) {
    const result = await this.bookCopyService.update(id, dto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.bookCopyService.remove(id);
    return result;
  }
}
