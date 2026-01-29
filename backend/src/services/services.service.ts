import { Injectable, OnModuleInit } from '@nestjs/common';
import { ServicesRepository } from '../repositories/services.repository';
import { CreateServiceDto } from '../modules/services/dtos/create-service.dto';
import { UpdateServiceDto } from '../modules/services/dtos/update-service.dto';

@Injectable()
export class ServicesService implements OnModuleInit {
  constructor(private repo: ServicesRepository) {}

  async onModuleInit() {
    // Quando o servidor sobe, corrigimos dados antigos de serviços automaticamente
    await this.repo.fixLegacyStatuses();
  }
  create(dto: CreateServiceDto) {
    return this.repo.create(dto);
  }
  findAll() {
    return this.repo.findAll();
  }
  findOne(id: string) {
    return this.repo.findOne(id);
  }
  async update(id: string, dto: UpdateServiceDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }
  async remove(id: string) {
    const service = await this.findOne(id);
    if (!service) return { deleted: false };
    
    try {
      await this.repo.delete(id);
      return { deleted: true };
    } catch (error) {
      // Se falhar por restrição de chave estrangeira (agendamentos vinculados)
      // nós apenas inativamos o serviço para preservar o histórico
      await this.repo.update(id, { active: false });
      return { deleted: true, deactivated: true, message: 'Serviço inativado pois possui agendamentos vinculados.' };
    }
  }
}
