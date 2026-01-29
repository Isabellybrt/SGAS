import { IsString, IsUUID, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID do serviço a ser agendado' })
  @IsUUID()
  serviceId: string;

  @ApiProperty({ example: '2023-10-25T14:30:00Z', description: 'Data e hora de início do agendamento (ISO 8601)' })
  @IsDateString()
  startAt: string;

  @ApiPropertyOptional({ example: 'Cliente prefere ser atendido por Maria', description: 'Observações adicionais' })
  @IsOptional()
  @IsString()
  notes?: string;
}
