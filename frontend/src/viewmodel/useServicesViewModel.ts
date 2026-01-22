import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { serviceService } from '../model/services/ServiceService';
import type { Service } from '../model/entities/Service';
import { useAuth } from '../context/AuthContext';

export function useServicesViewModel() {
  const [services, setServices] = useState<Service[]>([]);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await serviceService.getAll();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await serviceService.create(name, duration, price);
      toast.success('Serviço criado!');
      setName('');
      setDuration(30);
      setPrice(0);
      fetchServices();
    } catch (error) {
      toast.error('Erro ao criar serviço');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza?')) return;
    try {
      await serviceService.delete(id);
      toast.success('Serviço removido');
      fetchServices();
    } catch (error) {
      toast.error('Erro ao remover');
    }
  };

  return {
    services,
    isAdmin,
    name, setName,
    duration, setDuration,
    price, setPrice,
    handleCreate,
    handleDelete
  };
}
