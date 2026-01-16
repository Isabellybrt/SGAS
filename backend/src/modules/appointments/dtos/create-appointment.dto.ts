import { IsString, IsUUID, IsDateString, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  serviceId: string;
  @IsDateString()
  startAt: string;
  @IsOptional()
  @IsString()
  notes?: string;
}
