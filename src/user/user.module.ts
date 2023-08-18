import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// Asegúrate de importar el UserRepository

import { User } from './user.entity';
import { Role } from 'src/role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]), // Importa UserRepository y RoleRepository aquí
  ],
  controllers: [UserController],
  providers: [UserService, User], // Asegúrate de registrar UserRepository en los providers
  exports: [UserService],
})
export class UserModule {}
