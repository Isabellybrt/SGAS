import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../../entities/appointment.entity';
import { ServiceEntity } from '../../entities/service.entity';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment) private repo: Repository<Appointment>,
    @InjectRepository(ServiceEntity) private services: Repository<ServiceEntity>
  ) {}
  async create(dto: CreateAppointmentDto, userId: string) {
    const service = await this.services.findOne({ where: { id: dto.serviceId, active: true } });
    if (!service) throw new BadRequestException();
    const startAt = new Date(dto.startAt);
    const endAt = new Date(startAt.getTime() + service.durationMinutes * 60000);
    const conflict = await this.repo.findOne({ where: { serviceId: service.id, startAt } });
    if (conflict) throw new BadRequestException();
    const entity = this.repo.create({
      serviceId: service.id,
      customerId: userId,
      startAt,
      endAt,
      status: 'scheduled',
      notes: dto.notes ?? null
    });
    return this.repo.save(entity);
  }
  findAll(filters: any) {
    return this.repo.find({ where: filters, relations: ['service', 'customer'] });
  }
  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['service', 'customer'] });
  }
  async update(id: string, dto: UpdateAppointmentDto) {
    const entity = await this.findOne(id);
    if (!entity) throw new BadRequestException();
    if (dto.startAt) entity.startAt = new Date(dto.startAt);
    if (dto.notes !== undefined) entity.notes = dto.notes ?? null;
    return this.repo.save(entity);
  }
  async remove(id: string) {
    await this.repo.delete(id);
    return { deleted: true };
  }
}
