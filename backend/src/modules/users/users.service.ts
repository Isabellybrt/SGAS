import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(name: string, email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.repo.create({ name, email, passwordHash, role: 'user' });
    return this.repo.save(user);
  }
  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
  async findAll() {
    return this.repo.find();
  }
}
