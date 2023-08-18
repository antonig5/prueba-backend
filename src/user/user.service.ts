import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  findOneByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  remove(id: number) {
    throw new Error('Method not implemented.');
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
  create(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
  findOne(id: number) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    await this.userRepository.update(id, data);
    return this.findUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find({ where: { is_deleted: false } });
  }

  // Implement other methods as needed
}
