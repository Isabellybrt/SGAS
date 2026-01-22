import { describe, it, expect, vi, beforeEach } from 'vitest';
import { appointmentRepository } from '../../model/repositories/AppointmentRepository';
import api from '../../model/repositories/httpClient';

// Mock api
vi.mock('../../model/repositories/httpClient', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('AppointmentRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get all appointments without userId', async () => {
    const mockAppointments = [{ id: '1', serviceId: 's1' }];
    (api.get as any).mockResolvedValue({ data: mockAppointments });

    const result = await appointmentRepository.getAll();

    expect(api.get).toHaveBeenCalledWith('/appointments');
    expect(result).toBe(mockAppointments);
  });

  it('should get all appointments with userId', async () => {
    const userId = 'user-123';
    const mockAppointments = [{ id: '1', serviceId: 's1' }];
    (api.get as any).mockResolvedValue({ data: mockAppointments });

    const result = await appointmentRepository.getAll(userId);

    expect(api.get).toHaveBeenCalledWith(`/appointments?customerId=${userId}`);
    expect(result).toBe(mockAppointments);
  });

  it('should create an appointment', async () => {
    const serviceId = 's1';
    const startAt = '2024-01-01T10:00:00Z';
    (api.post as any).mockResolvedValue({ data: {} });

    await appointmentRepository.create(serviceId, startAt);

    expect(api.post).toHaveBeenCalledWith('/appointments', { serviceId, startAt });
  });

  it('should delete an appointment', async () => {
    const id = '123';
    (api.delete as any).mockResolvedValue({ data: {} });

    await appointmentRepository.delete(id);

    expect(api.delete).toHaveBeenCalledWith(`/appointments/${id}`);
  });
});
