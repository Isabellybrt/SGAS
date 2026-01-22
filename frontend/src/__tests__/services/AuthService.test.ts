import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { authService } from '../../model/services/AuthService';
import { authRepository } from '../../model/repositories/AuthRepository';

// Mock dependencies
vi.mock('../../model/repositories/AuthRepository', () => ({
  authRepository: {
    login: vi.fn(),
    register: vi.fn(),
  },
}));

vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(),
}));

import { jwtDecode } from 'jwt-decode';

describe('AuthService', () => {
  const mockUser = {
    sub: '123',
    name: 'Test User',
    email: 'test@example.com',
    role: 'USER',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should login successfully and save token', async () => {
    const token = 'valid-token';
    const email = 'test@example.com';
    const password = 'password123';

    // Setup mocks
    (authRepository.login as any).mockResolvedValue(token);
    (jwtDecode as any).mockReturnValue(mockUser);

    const result = await authService.login(email, password);

    expect(authRepository.login).toHaveBeenCalledWith(email, password);
    expect(localStorage.getItem('token')).toBe(token);
    expect(result).toEqual({
      id: mockUser.sub,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    });
  });

  it('should register successfully', async () => {
    const name = 'Test User';
    const email = 'test@example.com';
    const password = 'password123';

    (authRepository.register as any).mockResolvedValue(undefined);

    await authService.register(name, email, password);

    expect(authRepository.register).toHaveBeenCalledWith(name, email, password);
  });

  it('should return user if token is valid', () => {
    const token = 'valid-token';
    localStorage.setItem('token', token);
    
    // Mock token expiration in future
    (jwtDecode as any).mockReturnValue({ ...mockUser, exp: Date.now() / 1000 + 3600 });

    const user = authService.getUser();

    expect(user).toEqual({
      id: mockUser.sub,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    });
  });

  it('should logout if token is expired', () => {
    const token = 'expired-token';
    localStorage.setItem('token', token);
    
    // Mock token expiration in past
    (jwtDecode as any).mockReturnValue({ ...mockUser, exp: Date.now() / 1000 - 3600 });

    const user = authService.getUser();

    expect(user).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should logout manually', () => {
    localStorage.setItem('token', 'some-token');
    authService.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
