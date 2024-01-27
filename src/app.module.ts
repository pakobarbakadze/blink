import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './config/db';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, DbModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
