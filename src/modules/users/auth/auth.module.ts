import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './service/auth.service';

@Module({
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
