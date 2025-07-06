import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReturnBookDto {
  @ApiProperty({
    example: 'eec0c99a-4d01-44b2-91f6-1abc63a2d825',
    required: true,
  })
  @IsString()
  bookCopyId: string;
}
