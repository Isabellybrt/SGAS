import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from '../entities/service.entity';

@Injectable()
export class ServicesRepository {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly repo: Repository<ServiceEntity>,
  ) {}

  async create(data: Partial<ServiceEntity>): Promise<ServiceEntity> {
    const service = this.repo.create(data);
    return this.repo.save(service);
  }

  async findAll(): Promise<ServiceEntity[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<ServiceEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<ServiceEntity>): Promise<void> {
    await this.repo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async fixLegacyStatuses(): Promise<void> {
    // Atualiza serviços antigos para português
    await this.repo.createQueryBuilder()
      .update(ServiceEntity)
      .set({ status: 'Ativo' })
      .where("status = :oldStatus", { oldStatus: 'active' })
      .execute();

    await this.repo.createQueryBuilder()
      .update(ServiceEntity)
      .set({ status: 'Inativo' })
      .where("status = :oldStatus", { oldStatus: 'inactive' })
      .execute();
  }
}
