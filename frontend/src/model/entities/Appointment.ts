import type { Service } from './Service';

export interface Appointment {
  id: string;
  startAt: string;
  endAt: string;
  status: 'scheduled' | 'cancelled' | 'completed';
  service: Service;
}
