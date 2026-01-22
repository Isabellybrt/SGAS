import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../model/services/AuthService';

export function useRegisterViewModel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register(name, email, password);
      toast.success('Cadastro realizado! Faça login.');
      navigate('/login');
    } catch (error: any) {
      if (error.response?.data?.message) {
        const messages = error.response.data.message;
        if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(msg));
        } else {
            toast.error(messages);
        }
      } else {
        toast.error('Erro ao cadastrar. Tente novamente.');
      }
      console.error(error);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
}
