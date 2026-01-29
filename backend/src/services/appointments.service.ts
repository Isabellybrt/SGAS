import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { AppointmentsRepository } from '../repositories/appointments.repository';
import { ServicesRepository } from '../repositories/services.repository';
import { CreateAppointmentDto } from '../modules/appointments/dtos/create-appointment.dto';
import { UpdateAppointmentDto } from '../modules/appointments/dtos/update-appointment.dto';

@Injectable()
export class AppointmentsService implements OnModuleInit {
  constructor(
    private repo: AppointmentsRepository,
    private services: ServicesRepository
  ) {}

  async onModuleInit() {
    // Quando o servidor sobe, corrigimos dados antigos automaticamente
    await this.repo.fixLegacyStatuses();
  }
  async create(dto: CreateAppointmentDto, userId: string) {
    const service = await this.services.findOne(dto.serviceId);
    if (!service || !service.active) throw new BadRequestException('Serviço inválido ou inativo');
    
    const startAt = new Date(dto.startAt);
    const endAt = new Date(startAt.getTime() + service.durationMinutes * 60000);
    
    const conflict = await this.repo.findOverlap(service.id, startAt, endAt);
    if (conflict) throw new BadRequestException('Conflito de horário para este serviço');
    
    // Atualiza o status do serviço para "Agendado"
    await this.services.update(service.id, { status: 'Agendado' });
    
    return this.repo.create({
      serviceId: service.id,
      customerId: userId,
      startAt,
      endAt,
      status: 'Agendado' as const,
      notes: dto.notes ?? null
    });
  }
  findAll(filters: any) {
    return this.repo.findAll(filters);
  }
  findOne(id: string) {
    return this.repo.findOne(id);
  }
  async update(id: string, dto: UpdateAppointmentDto) {
    const entity = await this.findOne(id);
    if (!entity) throw new BadRequestException('Agendamento não encontrado');
    
    const updates: any = {};
    if (dto.startAt) updates.startAt = new Date(dto.startAt);
    if (dto.notes !== undefined) updates.notes = dto.notes ?? null;
    
    await this.repo.update(id, updates);
    return this.findOne(id);
  }
  async remove(id: string) {
    const appointment = await this.findOne(id);
    if (!appointment) throw new BadRequestException('Agendamento não encontrado');
    
    // Se o agendamento for cancelado, podemos voltar o status do serviço para "Ativo"
    // se não houver outros agendamentos ativos para ele
    await this.repo.update(id, { status: 'Cancelado' });
    
    const otherActive = await this.repo.findAll({ serviceId: appointment.serviceId, status: 'Agendado' });
    if (otherActive.length === 0) {
      await this.services.update(appointment.serviceId, { status: 'Ativo' });
    }
    
    return { cancelled: true };
  }
}
