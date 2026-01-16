import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(2)
  name: string;
  @IsInt()
  @Min(1)
  durationMinutes: number;
  @IsNumber()
  @Min(0)
  price: number;
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
