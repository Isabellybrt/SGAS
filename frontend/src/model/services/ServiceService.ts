import { serviceRepository } from '../repositories/ServiceRepository';
import type { Service } from '../entities/Service';

export class ServiceService {
  async getAll(): Promise<Service[]> {
    return serviceRepository.getAll();
  }
  async create(name: string, durationMinutes: number, price: number): Promise<void> {
    await serviceRepository.create({ name, durationMinutes, price, active: true });
  }
  async delete(id: string): Promise<void> {
    await serviceRepository.delete(id);
  }
}
export const serviceService = new ServiceService();
