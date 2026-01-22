import { describe, it, expect, vi, beforeEach } from 'vitest';
import { appointmentService } from '../../model/services/AppointmentService';
import { appointmentRepository } from '../../model/repositories/AppointmentRepository';

vi.mock('../../model/repositories/AppointmentRepository', () => ({
  appointmentRepository: {
    getAll: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('AppointmentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get all appointments for admin (no userId filter)', async () => {
    const userId = 'user-123';
    const isAdmin = true;
    const mockAppointments = [{ id: '1' }];
    (appointmentRepository.getAll as any).mockResolvedValue(mockAppointments);

    const result = await appointmentService.getMyAppointments(userId, isAdmin);

    expect(appointmentRepository.getAll).toHaveBeenCalledWith(); // Called without args
    expect(result).toBe(mockAppointments);
  });

  it('should get appointments for specific user if not admin', async () => {
    const userId = 'user-123';
    const isAdmin = false;
    const mockAppointments = [{ id: '1' }];
    (appointmentRepository.getAll as any).mockResolvedValue(mockAppointments);

    const result = await appointmentService.getMyAppointments(userId, isAdmin);

    expect(appointmentRepository.getAll).toHaveBeenCalledWith(userId);
    expect(result).toBe(mockAppointments);
  });

  it('should create an appointment', async () => {
    const serviceId = 's1';
    const startAt = '2024-01-01T10:00:00Z';
    (appointmentRepository.create as any).mockResolvedValue(undefined);

    await appointmentService.create(serviceId, startAt);

    expect(appointmentRepository.create).toHaveBeenCalledWith(serviceId, startAt);
  });

  it('should cancel (delete) an appointment', async () => {
    const id = '123';
    (appointmentRepository.delete as any).mockResolvedValue(undefined);

    await appointmentService.cancel(id);

    expect(appointmentRepository.delete).toHaveBeenCalledWith(id);
  });
});
