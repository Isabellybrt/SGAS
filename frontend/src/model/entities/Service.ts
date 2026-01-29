export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  price?: number;
  active?: boolean;
  status?: string;
}
