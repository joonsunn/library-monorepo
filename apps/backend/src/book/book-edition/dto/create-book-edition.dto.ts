import { ApiProperty } from '@nestjs/swagger';
import { IsISBN, IsString } from 'class-validator';

export class CreateBookEditionDto {
  @ApiProperty({
    example: '978-3-16-148410-0',
  })
  @IsISBN()
  isbn: string;

  @ApiProperty({
    example: 'Clean Code',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Robert C. Martin',
  })
  @IsString()
  author: string;
}
