import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from 'types/pagination.type';

export class QueryBookLoanDto extends PaginationQueryDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  isbn?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  bookCopyId?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  borrowerId?: string;
}
