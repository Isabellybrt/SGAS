import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesService } from '../../services/services.service';
import { ServicesController } from '../../controllers/services.controller';
import { ServicesRepository } from '../../repositories/services.repository';
import { ServiceEntity } from '../../entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  providers: [ServicesService, ServicesRepository],
  controllers: [ServicesController],
  exports: [ServicesService, ServicesRepository]
})
export class ServicesModule {}
