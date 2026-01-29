import Navbar from '../components/Navbar';
import { format } from 'date-fns';
import { useAppointmentsViewModel } from '../../viewmodel/useAppointmentsViewModel';

export default function Appointments() {
  const { appointments, services, serviceId, setServiceId, date, setDate, time, setTime, handleCreate, handleCancel } = useAppointmentsViewModel();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Meus Agendamentos</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium mb-4">Novo Agendamento</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700">Serviço</label>
              <select 
                value={serviceId} 
                onChange={e => setServiceId(e.target.value)} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
                required
              >
                <option value="">Selecione...</option>
                {services.filter(s => s.active).map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.durationMinutes} min)</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Data</label>
              <input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min={new Date().toISOString().split('T')[0]}
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Horário</label>
              <input 
                type="time" 
                value={time} 
                onChange={e => setTime(e.target.value)} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required 
              />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 h-10">Agendar</button>
          </form>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {appointments.length === 0 && (
              <li className="px-4 py-4 sm:px-6 text-gray-500 text-center">Nenhum agendamento encontrado.</li>
            )}
            {appointments.map(apt => (
              <li key={apt.id}>
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-indigo-600">
                      {apt.service?.name || 'Serviço (removido)'}
                    </h4>
                    <p className="text-gray-600">
                      {format(new Date(apt.startAt), 'dd/MM/yyyy HH:mm')} - {format(new Date(apt.endAt), 'HH:mm')}
                    </p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2
                      ${apt.status === 'Agendado' ? 'bg-blue-100 text-blue-800' : 
                        apt.status === 'Cancelado' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {apt.status}
                    </span>
                  </div>
                  {apt.status === 'Agendado' && (
                    <button 
                      onClick={() => handleCancel(apt.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium border border-red-200 px-3 py-1 rounded hover:bg-red-50"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
