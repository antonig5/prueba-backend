import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service'; // Asegúrate de importar el UserService
import { UserModule } from '../user/user.module'; // Asegúrate de importar el UserModule

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: 'hello', // Cambia esto a tu clave secreta
      signOptions: { expiresIn: '1h' },
    }),
    UserModule, // Asegúrate de importar el UserModule
  ],
  providers: [AuthService, JwtStrategy, UserService], // Asegúrate de incluir el UserService en los providers
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
