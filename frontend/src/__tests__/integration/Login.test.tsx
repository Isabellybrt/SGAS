import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../view/pages/Login';
import { AuthProvider } from '../../context/AuthContext';
import { authService } from '../../model/services/AuthService';
import { toast } from 'react-toastify';

// Mock dependencies
vi.mock('../../model/services/AuthService');
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form correctly', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });

  it('should perform login successfully', async () => {
    const user = userEvent.setup();
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', role: 'USER' };
    
    // Setup mock
    (authService.login as any).mockResolvedValue(mockUser);
    (authService.getUser as any).mockReturnValue(null); // Initially no user

    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    // Fill form
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/Senha/i), 'password123');
    
    // Submit
    await user.click(screen.getByRole('button', { name: /Entrar/i }));

    // Assertions
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(toast.success).toHaveBeenCalledWith('Login realizado com sucesso!');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should show error on login failure', async () => {
    const user = userEvent.setup();
    
    // Setup mock failure
    (authService.login as any).mockRejectedValue(new Error('Invalid credentials'));
    (authService.getUser as any).mockReturnValue(null);

    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    // Fill form
    await user.type(screen.getByLabelText(/Email/i), 'wrong@example.com');
    await user.type(screen.getByLabelText(/Senha/i), 'wrongpass');
    
    // Submit
    await user.click(screen.getByRole('button', { name: /Entrar/i }));

    // Assertions
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Erro ao fazer login. Verifique suas credenciais.');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
