import api from './httpClient';
import type { Appointment } from '../entities/Appointment';

export class AppointmentRepository {
  async getAll(userId?: string): Promise<Appointment[]> {
    const url = userId ? `/appointments?customerId=${userId}` : '/appointments';
    const res = await api.get(url);
    return res.data;
  }
  async create(serviceId: string, startAt: string): Promise<void> {
    await api.post('/appointments', { serviceId, startAt });
  }
  async delete(id: string): Promise<void> {
    await api.delete(`/appointments/${id}`);
  }
}
export const appointmentRepository = new AppointmentRepository();
