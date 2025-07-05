import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export type Paginated<T> = {
  data: T[];
  meta: {
    page?: number;
    pageSize: number;
    totalRows: number;
    totalPages?: number;
    cursor?: string;
  };
};

export type PaginationQuery = {
  page?: number;
  pageSize: number;
  cursor?: string;
};

export class PaginationQueryDto {
  @ApiProperty({
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize?: number;
}
