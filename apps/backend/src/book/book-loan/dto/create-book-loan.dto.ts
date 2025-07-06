import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateBookLoanDto {
  @ApiProperty({
    example: 'b3616885-90dc-4b5f-85a6-922d885b22ff',
  })
  @IsString()
  @IsOptional()
  borrowerId: string;

  @ApiProperty({
    example: 'eec0c99a-4d01-44b2-91f6-1abc63a2d825',
  })
  @IsString()
  @IsOptional()
  bookCopyId: string;
}
