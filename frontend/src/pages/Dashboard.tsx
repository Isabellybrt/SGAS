import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Bem-vindo ao SGAS
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Sistema de Gerenciamento de Agendamentos e Serviços.
            <br />
            Olá, <span className="text-indigo-600 font-bold">{user?.name || user?.email}</span>!
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Ver Serviços
            </Link>
            <Link
              to="/appointments"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              Meus Agendamentos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
