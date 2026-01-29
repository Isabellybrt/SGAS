import type { Service } from './Service';

export interface Appointment {
  id: string;
  startAt: string;
  endAt: string;
  status: 'Agendado' | 'Cancelado' | 'Concluído';
  service: Service;
}
