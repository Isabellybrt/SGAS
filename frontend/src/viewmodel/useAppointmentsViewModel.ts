import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { appointmentService } from '../model/services/AppointmentService';
import { serviceService } from '../model/services/ServiceService';
import type { Appointment } from '../model/entities/Appointment';
import type { Service } from '../model/entities/Service';
import { useAuth } from '../context/AuthContext';

export function useAppointmentsViewModel() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const { user } = useAuth();

  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (user) {
        fetchAppointments();
    }
    fetchServices();
  }, [user]);

  const fetchAppointments = async () => {
    if (!user) return;
    try {
      const data = await appointmentService.getMyAppointments(user.id, user.role === 'admin');
      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchServices = async () => {
    try {
      const data = await serviceService.getAll();
      setServices(data.filter(s => s.active !== false));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceId || !date || !time) {
      toast.warning('Preencha todos os campos');
      return;
    }

    const startAt = new Date(`${date}T${time}:00`).toISOString();

    try {
      await appointmentService.create(serviceId, startAt);
      toast.success('Agendamento realizado!');
      setServiceId('');
      setDate('');
      setTime('');
      fetchAppointments();
    } catch (error) {
      toast.error('Erro ao agendar. Verifique se o horário está disponível.');
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Deseja cancelar este agendamento?')) return;
    try {
      await appointmentService.cancel(id);
      toast.success('Agendamento cancelado');
      fetchAppointments();
    } catch (error) {
      toast.error('Erro ao cancelar');
    }
  };

  return {
    appointments,
    services,
    serviceId, setServiceId,
    date, setDate,
    time, setTime,
    handleCreate,
    handleCancel
  };
}
