import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServicesService } from '../services/services.service';
import { CreateServiceDto } from '../modules/services/dtos/create-service.dto';
import { UpdateServiceDto } from '../modules/services/dtos/update-service.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Serviços')
@Controller('services')
export class ServicesController {
  constructor(private service: ServicesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar serviços', description: 'Retorna todos os serviços cadastrados.' })
  @ApiResponse({ status: 200, description: 'Lista de serviços retornada com sucesso.' })
  list() {
    return this.service.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Criar serviço', description: 'Cria um novo serviço (Apenas Admin).' })
  @ApiResponse({ status: 201, description: 'Serviço criado com sucesso.' })
  @ApiResponse({ status: 403, description: 'Acesso negado (requer role admin).' })
  create(@Body() dto: CreateServiceDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Atualizar serviço', description: 'Atualiza os dados de um serviço existente (Apenas Admin).' })
  @ApiResponse({ status: 200, description: 'Serviço atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Remover serviço', description: 'Remove ou inativa um serviço (Apenas Admin).' })
  @ApiResponse({ status: 200, description: 'Serviço removido ou inativado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
