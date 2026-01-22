import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authRepository } from '../../model/repositories/AuthRepository';
import api from '../../model/repositories/httpClient';

// Mock the api instance
vi.mock('../../model/repositories/httpClient', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('AuthRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call api.post with correct arguments on login', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const mockToken = 'mock-token';
    
    // Mock successful response
    (api.post as any).mockResolvedValue({ data: { accessToken: mockToken } });

    const result = await authRepository.login(email, password);

    expect(api.post).toHaveBeenCalledWith('/auth/login', { email, password });
    expect(result).toBe(mockToken);
  });

  it('should call api.post with correct arguments on register', async () => {
    const name = 'Test User';
    const email = 'test@example.com';
    const password = 'password123';

    (api.post as any).mockResolvedValue({ data: {} });

    await authRepository.register(name, email, password);

    expect(api.post).toHaveBeenCalledWith('/auth/register', { name, email, password });
  });
});
