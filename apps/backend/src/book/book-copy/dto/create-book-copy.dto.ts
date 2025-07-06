import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBookCopyDto {
  @ApiProperty({
    example: '978-3-16-148410-0',
    required: false,
  })
  @IsString()
  @IsOptional()
  isbn?: string;

  @ApiProperty({
    example: '737a018f-fc5e-4984-abdf-b4865f9b8cf5',
    required: false,
  })
  @IsString()
  @IsOptional()
  editionId?: string;
}
