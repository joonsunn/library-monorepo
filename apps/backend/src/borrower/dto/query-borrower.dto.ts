import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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

export class QueryBorrowerDto extends PaginationQueryDto {
  @ApiProperty({
    example: 'john@email.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: 'joe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
