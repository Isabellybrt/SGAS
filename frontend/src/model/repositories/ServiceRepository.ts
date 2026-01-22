import api from './httpClient';
import type { Service } from '../entities/Service';

export class ServiceRepository {
  async getAll(): Promise<Service[]> {
    const res = await api.get('/services');
    return res.data;
  }
  async create(service: Omit<Service, 'id'>): Promise<void> {
    await api.post('/services', service);
  }
  async delete(id: string): Promise<void> {
    await api.delete(`/services/${id}`);
  }
}
export const serviceRepository = new ServiceRepository();
