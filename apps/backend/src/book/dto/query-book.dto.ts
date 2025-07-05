import { IsISBN, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from 'types/pagination.type';

export class QueryBookDto extends PaginationQueryDto {
  @ApiProperty({
    example: '978-3-16-148410-0',
    required: false,
  })
  @IsISBN()
  @IsOptional()
  isbn?: string;

  @ApiProperty({
    example: 'Clean Code',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Robert C. Martin',
    required: false,
  })
  @IsOptional()
  @IsString()
  author?: string;
}
