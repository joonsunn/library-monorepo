import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBorrowerDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString({ message: 'name is required' })
  name: string;

  @ApiProperty({
    example: 'john@email.com',
  })
  @IsString({ message: 'Email is required' })
  @IsEmail()
  email: string;
}
