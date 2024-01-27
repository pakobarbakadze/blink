import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { RefreshToken } from './entities/refresh-token.entity';
import { AuthService } from './service/auth.service';
import { RefreshTokenService } from './service/refresh-token.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.register({
      secret: process.env.ACCESS_JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthResolver, AuthService, RefreshTokenService],
})
export class AuthModule {}
