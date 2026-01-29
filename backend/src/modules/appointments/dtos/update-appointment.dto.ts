import { IsString, IsDateString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAppointmentDto {
  @ApiPropertyOptional({ example: '2023-10-26T10:00:00Z', description: 'Nova data e hora de início' })
  @IsOptional()
  @IsDateString()
  startAt?: string;

  @ApiPropertyOptional({ example: 'Mudança de horário solicitada pelo cliente', description: 'Observações' })
  @IsOptional()
  @IsString()
  notes?: string;
}
