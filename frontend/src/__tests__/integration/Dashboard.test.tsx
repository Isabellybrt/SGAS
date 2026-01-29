import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../view/pages/Dashboard';
import { AuthProvider } from '../../context/AuthContext';
import { authService } from '../../model/services/AuthService';

// Mock dependencies
vi.mock('../../model/services/AuthService');

// Mock Navbar component to simplify testing (avoid testing Navbar logic here)
vi.mock('../../view/components/Navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>,
}));

describe('Dashboard Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render dashboard with user information', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com', role: 'USER' };
    
    // Mock getUser to return a logged-in user
    (authService.getUser as any).mockReturnValue(mockUser);

    render(
      <AuthProvider>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </AuthProvider>
    );

    // Wait for loading to finish (AuthProvider has a loading state)
    expect(await screen.findByText('Bem-vindo ao SGAS')).toBeInTheDocument();
    
    // Check if user name is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check for navigation links
    expect(screen.getByText('Ver Serviços')).toBeInTheDocument();
    expect(screen.getByText('Meus Agendamentos')).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});
