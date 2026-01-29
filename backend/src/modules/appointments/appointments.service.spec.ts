import { Test } from '@nestjs/testing';
import { AppointmentsService } from '../../services/appointments.service';
import { AppointmentsRepository } from '../../repositories/appointments.repository';
import { ServicesRepository } from '../../repositories/services.repository';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  const appointmentRepo = { findOne: jest.fn(), findOverlap: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() };
  const servicesRepo = { findOne: jest.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        { provide: AppointmentsRepository, useValue: appointmentRepo },
        { provide: ServicesRepository, useValue: servicesRepo }
      ]
    }).compile();
    service = module.get(AppointmentsService);
    jest.resetAllMocks();
  });

  it('cria agendamento quando serviço está ativo e não há conflito', async () => {
    servicesRepo.findOne.mockResolvedValue({ id: 's1', active: true, durationMinutes: 30 });
    appointmentRepo.findOverlap.mockResolvedValue(null);
    appointmentRepo.create.mockResolvedValue({ id: 'a1', status: 'Agendado' });

    const result = await service.create({ serviceId: 's1', startAt: '2026-01-20T14:00:00Z' }, 'u1');
    expect(result.status).toBe('Agendado');
    expect(appointmentRepo.create).toHaveBeenCalled();
  });

  it('falha se serviço não existe/está inativo', async () => {
    servicesRepo.findOne.mockResolvedValue(null);
    await expect(
      service.create({ serviceId: 's1', startAt: '2026-01-20T14:00:00Z' }, 'u1')
    ).rejects.toBeTruthy();
  });
});
