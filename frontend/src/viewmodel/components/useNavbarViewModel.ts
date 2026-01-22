import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function useNavbarViewModel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return { user, handleLogout };
}
