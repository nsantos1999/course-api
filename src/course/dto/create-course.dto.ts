import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
