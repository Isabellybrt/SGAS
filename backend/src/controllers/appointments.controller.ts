import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from '../services/appointments.service';
import { CreateAppointmentDto } from '../modules/appointments/dtos/create-appointment.dto';
import { UpdateAppointmentDto } from '../modules/appointments/dtos/update-appointment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Agendamentos')
@Controller('appointments')
export class AppointmentsController {
  constructor(private service: AppointmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar agendamentos', description: 'Retorna agendamentos. Pode ser filtrado por query params.' })
  @ApiQuery({ name: 'serviceId', required: false, description: 'Filtrar por ID do serviço' })
  @ApiQuery({ name: 'customerId', required: false, description: 'Filtrar por ID do cliente' })
  @ApiResponse({ status: 200, description: 'Lista de agendamentos.' })
  list(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter agendamento', description: 'Retorna detalhes de um agendamento específico.' })
  @ApiResponse({ status: 200, description: 'Detalhes do agendamento.' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado.' })
  get(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Criar agendamento', description: 'Cria um novo agendamento para o usuário autenticado.' })
  @ApiResponse({ status: 201, description: 'Agendamento criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou conflito de horário.' })
  create(@Body() dto: CreateAppointmentDto, @Req() req: any) {
    return this.service.create(dto, req.user.sub);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Atualizar agendamento', description: 'Atualiza um agendamento existente.' })
  @ApiResponse({ status: 200, description: 'Agendamento atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado.' })
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Cancelar agendamento', description: 'Remove um agendamento.' })
  @ApiResponse({ status: 200, description: 'Agendamento removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado.' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
