import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Corte de Cabelo', description: 'Nome do serviço' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 30, description: 'Duração em minutos', minimum: 1 })
  @IsInt()
  @Min(1)
  durationMinutes: number;

  @ApiProperty({ example: 50.00, description: 'Preço do serviço', minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: true, description: 'Se o serviço está ativo para agendamentos' })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
