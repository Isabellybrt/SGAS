import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}
  async create(name: string, email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    return this.repo.create({ name, email, passwordHash, role: 'user' });
  }
  async findByEmail(email: string) {
    return this.repo.findByEmail(email);
  }
  async findAll() {
    return this.repo.findAll();
  }
}
