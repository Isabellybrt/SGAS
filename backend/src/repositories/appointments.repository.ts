import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,
  ) {}

  async create(data: Partial<Appointment>): Promise<Appointment> {
    const appointment = this.repo.create(data);
    return this.repo.save(appointment);
  }

  async findAll(query: any): Promise<Appointment[]> {
    return this.repo.find({
      where: query,
      relations: ['service', 'customer'],
    });
  }

  async findOne(id: string): Promise<Appointment | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['service', 'customer'],
    });
  }

  async findOverlap(serviceId: string, startAt: Date, endAt: Date): Promise<Appointment | null> {
    return this.repo.findOne({
      where: {
        serviceId,
        startAt: LessThan(endAt),
        endAt: MoreThan(startAt),
      },
    });
  }

  async countByService(serviceId: string): Promise<number> {
    return this.repo.count({ where: { serviceId } });
  }

  async update(id: string, data: Partial<Appointment>): Promise<void> {
    await this.repo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async fixLegacyStatuses(): Promise<void> {
    // Atualiza agendamentos antigos para português
    await this.repo.createQueryBuilder()
      .update(Appointment)
      .set({ status: 'Agendado' })
      .where("status = :oldStatus", { oldStatus: 'scheduled' })
      .execute();

    await this.repo.createQueryBuilder()
      .update(Appointment)
      .set({ status: 'Cancelado' })
      .where("status = :oldStatus", { oldStatus: 'cancelled' })
      .execute();

    await this.repo.createQueryBuilder()
      .update(Appointment)
      .set({ status: 'Concluído' })
      .where("status = :oldStatus", { oldStatus: 'completed' })
      .execute();
  }
}
