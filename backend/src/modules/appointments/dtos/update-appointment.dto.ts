import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsDateString()
  startAt?: string;
  @IsOptional()
  @IsString()
  notes?: string;
}
