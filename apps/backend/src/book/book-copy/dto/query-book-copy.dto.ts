import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from 'types/pagination.type';

export class QueryBookCopyDto extends PaginationQueryDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  isbn?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;
}
