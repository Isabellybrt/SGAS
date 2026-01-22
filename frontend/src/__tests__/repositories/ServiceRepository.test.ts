import { describe, it, expect, vi, beforeEach } from 'vitest';
import { serviceRepository } from '../../model/repositories/ServiceRepository';
import api from '../../model/repositories/httpClient';

vi.mock('../../model/repositories/httpClient', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('ServiceRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get all services', async () => {
    const mockServices = [{ id: '1', name: 'Service 1' }];
    (api.get as any).mockResolvedValue({ data: mockServices });

    const result = await serviceRepository.getAll();

    expect(api.get).toHaveBeenCalledWith('/services');
    expect(result).toBe(mockServices);
  });

  it('should create a service', async () => {
    const newService = { name: 'New Service', durationMinutes: 60, price: 100, active: true };
    (api.post as any).mockResolvedValue({ data: {} });

    await serviceRepository.create(newService);

    expect(api.post).toHaveBeenCalledWith('/services', newService);
  });

  it('should delete a service', async () => {
    const id = '123';
    (api.delete as any).mockResolvedValue({ data: {} });

    await serviceRepository.delete(id);

    expect(api.delete).toHaveBeenCalledWith(`/services/${id}`);
  });
});
