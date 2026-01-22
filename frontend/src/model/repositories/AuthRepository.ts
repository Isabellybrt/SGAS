import api from './httpClient';

export class AuthRepository {
  async login(email: string, password: string): Promise<string> {
    const response = await api.post('/auth/login', { email, password });
    return response.data.accessToken;
  }

  async register(name: string, email: string, password: string): Promise<void> {
    await api.post('/auth/register', { name, email, password });
  }
}

export const authRepository = new AuthRepository();
