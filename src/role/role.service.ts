import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(name: string): Promise<Role> {
    const role = new Role();
    role.name = name;
    return this.roleRepository.save(role);
  }

  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.find({ where: { is_deleted: false } });
  }

  // Implement other methods as needed
}
