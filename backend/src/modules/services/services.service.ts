import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from '../../entities/service.entity';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(@InjectRepository(ServiceEntity) private repo: Repository<ServiceEntity>) {}
  create(dto: CreateServiceDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }
  findAll() {
    return this.repo.find();
  }
  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }
  async update(id: string, dto: UpdateServiceDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }
  async remove(id: string) {
    await this.repo.delete(id);
    return { deleted: true };
  }
}
