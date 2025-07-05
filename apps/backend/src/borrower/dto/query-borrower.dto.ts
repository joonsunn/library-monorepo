import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from 'types/pagination.type';

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
