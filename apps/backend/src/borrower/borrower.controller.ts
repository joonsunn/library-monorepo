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
import { BorrowerService } from './borrower.service';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { QueryBorrowerDto } from './dto/query-borrower.dto';

@Controller('borrower')
export class BorrowerController {
  constructor(private readonly borrowerService: BorrowerService) {}

  @Post()
  async create(@Body() createBorrowerDto: CreateBorrowerDto) {
    const result = await this.borrowerService.create(createBorrowerDto);

    return result;
  }

  @Get()
  async findAll(@Query() query: QueryBorrowerDto) {
    const result = await this.borrowerService.findAll(query);

    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.borrowerService.findOne(id);

    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBorrowerDto) {
    const result = await this.borrowerService.update(id, dto);

    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.borrowerService.remove(id);

    return result;
  }
}
