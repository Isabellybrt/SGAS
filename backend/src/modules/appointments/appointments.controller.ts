import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private service: AppointmentsService) {}
  @Get()
  list(@Query() query: any) {
    return this.service.findAll(query);
  }
  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateAppointmentDto, @Req() req: any) {
    return this.service.create(dto, req.user.sub);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.service.update(id, dto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
