import { Test } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment } from '../../entities/appointment.entity';
import { ServiceEntity } from '../../entities/service.entity';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  const appointmentRepo = { findOne: jest.fn(), create: jest.fn(), save: jest.fn(), delete: jest.fn() };
  const servicesRepo = { findOne: jest.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        { provide: getRepositoryToken(Appointment), useValue: appointmentRepo },
        { provide: getRepositoryToken(ServiceEntity), useValue: servicesRepo }
      ]
    }).compile();
    service = module.get(AppointmentsService);
    jest.resetAllMocks();
  });

  it('cria agendamento quando serviço está ativo e não há conflito', async () => {
    servicesRepo.findOne.mockResolvedValue({ id: 's1', active: true, durationMinutes: 30 });
    appointmentRepo.findOne.mockResolvedValue(null);
    appointmentRepo.create.mockImplementation((x: any) => x);
    appointmentRepo.save.mockResolvedValue({ id: 'a1', status: 'scheduled' });

    const result = await service.create({ serviceId: 's1', startAt: '2026-01-20T14:00:00Z' }, 'u1');
    expect(result.status).toBe('scheduled');
    expect(appointmentRepo.save).toHaveBeenCalled();
  });

  it('falha se serviço não existe/está inativo', async () => {
    servicesRepo.findOne.mockResolvedValue(null);
    await expect(
      service.create({ serviceId: 's1', startAt: '2026-01-20T14:00:00Z' }, 'u1')
    ).rejects.toBeTruthy();
  });
});
