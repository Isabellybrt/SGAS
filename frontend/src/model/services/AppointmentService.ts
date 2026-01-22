import { appointmentRepository } from '../repositories/AppointmentRepository';
import type { Appointment } from '../entities/Appointment';

export class AppointmentService {
  async getMyAppointments(userId: string, isAdmin: boolean): Promise<Appointment[]> {
    if (isAdmin) {
       return appointmentRepository.getAll();
    }
    return appointmentRepository.getAll(userId);
  }
  async create(serviceId: string, startAt: string): Promise<void> {
    await appointmentRepository.create(serviceId, startAt);
  }
  async cancel(id: string): Promise<void> {
    await appointmentRepository.delete(id);
  }
}
export const appointmentService = new AppointmentService();
