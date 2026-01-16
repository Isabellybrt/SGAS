import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  active: boolean;
}

export default function Services() {
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
      const res = await api.get('/services');
      setServices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/services', { name, durationMinutes: Number(duration), price: Number(price) });
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
      await api.delete(`/services/${id}`);
      toast.success('Serviço removido');
      fetchServices();
    } catch (error) {
      toast.error('Erro ao remover');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Serviços Disponíveis</h1>
        
        {isAdmin && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-lg font-medium mb-4">Novo Serviço</h3>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duração (min)</label>
                <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
                <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
              </div>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 h-10">Adicionar</button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <div key={service.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{service.name}</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p className="mb-1">Duração: <span className="font-semibold">{service.durationMinutes} min</span></p>
                  <p className="mb-1">Preço: <span className="font-semibold text-green-600">R$ {service.price}</span></p>
                  <p>Status: {service.active ? 'Ativo' : 'Inativo'}</p>
                </div>
                {isAdmin && (
                  <div className="mt-4 border-t pt-4">
                    <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Excluir</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
