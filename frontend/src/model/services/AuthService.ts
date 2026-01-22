import { jwtDecode } from 'jwt-decode';
import type { User } from '../entities/User';
import { authRepository } from '../repositories/AuthRepository';

export class AuthService {
  async login(email: string, password: string): Promise<User> {
    const token = await authRepository.login(email, password);
    this.saveToken(token);
    return this.getUserFromToken(token);
  }

  async register(name: string, email: string, password: string): Promise<void> {
    await authRepository.register(name, email, password);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUser(): User | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        this.logout();
        return null;
      }
      return this.getUserFromToken(token);
    } catch (error) {
      this.logout();
      return null;
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private getUserFromToken(token: string): User {
    const decoded: any = jwtDecode(token);
    return {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
  }
}

export const authService = new AuthService();
