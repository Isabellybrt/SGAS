import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from '../../services/appointments.service';
import { AppointmentsController } from '../../controllers/appointments.controller';
import { AppointmentsRepository } from '../../repositories/appointments.repository';
import { ServicesRepository } from '../../repositories/services.repository';
import { Appointment } from '../../entities/appointment.entity';
import { ServiceEntity } from '../../entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, ServiceEntity])],
  providers: [AppointmentsService, AppointmentsRepository, ServicesRepository],
  controllers: [AppointmentsController]
})
export class AppointmentsModule {}
