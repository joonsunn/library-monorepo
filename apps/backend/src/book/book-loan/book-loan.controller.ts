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
import { BookLoanService } from './book-loan.service';
import { UpdateBookLoanDto } from './dto/update-book-loan.dto';
import { QueryBookLoanDto } from './dto/query-book-loan.dto';
import { CheckOutBookDto } from './dto/check-out-book.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@Controller('book-loan')
export class BookLoanController {
  constructor(private readonly bookLoanService: BookLoanService) {}

  @Get()
  async findAll(@Query() query: QueryBookLoanDto) {
    const result = await this.bookLoanService.findAll(query);
    return result;
  }

  @Post('checkout')
  async checkOutBook(@Body() dto: CheckOutBookDto) {
    const result = await this.bookLoanService.checkOutBook(dto);

    return result;
  }

  @Post('return')
  async returnBook(@Body() dto: ReturnBookDto) {
    const result = await this.bookLoanService.returnBook(dto);

    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.bookLoanService.findOne(id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBookLoanDto) {
    const result = await this.bookLoanService.update(id, dto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.bookLoanService.remove(id);
    return result;
  }
}
