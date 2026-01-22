import { useAuth } from '../context/AuthContext';

export function useDashboardViewModel() {
  const { user } = useAuth();
  return { user };
}
