import { describe, it, expect, vi, beforeEach } from 'vitest';
import { serviceService } from '../../model/services/ServiceService';
import { serviceRepository } from '../../model/repositories/ServiceRepository';

vi.mock('../../model/repositories/ServiceRepository', () => ({
  serviceRepository: {
    getAll: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('ServiceService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get all services', async () => {
    const mockServices = [{ id: '1', name: 'Service 1' }];
    (serviceRepository.getAll as any).mockResolvedValue(mockServices);

    const result = await serviceService.getAll();

    expect(serviceRepository.getAll).toHaveBeenCalled();
    expect(result).toBe(mockServices);
  });

  it('should create a service with active=true', async () => {
    const name = 'New Service';
    const durationMinutes = 60;
    const price = 100;

    (serviceRepository.create as any).mockResolvedValue(undefined);

    await serviceService.create(name, durationMinutes, price);

    expect(serviceRepository.create).toHaveBeenCalledWith({
      name,
      durationMinutes,
      price,
      active: true,
    });
  });

  it('should delete a service', async () => {
    const id = '123';
    (serviceRepository.delete as any).mockResolvedValue(undefined);

    await serviceService.delete(id);

    expect(serviceRepository.delete).toHaveBeenCalledWith(id);
  });
});
