import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export function useLoginViewModel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
      console.error(error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
}
