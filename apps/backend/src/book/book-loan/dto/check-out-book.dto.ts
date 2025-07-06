import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CheckOutBookDto {
  @ApiProperty({
    example: 'b3616885-90dc-4b5f-85a6-922d885b22ff',
    required: true,
  })
  @IsString()
  borrowerId: string;

  @ApiProperty({
    example: 'eec0c99a-4d01-44b2-91f6-1abc63a2d825',
    required: true,
  })
  @IsString()
  bookCopyId: string;
}
