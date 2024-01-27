import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { InsertRefreshToken } from '../types/refresh-token.type';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  public async insert(
    insertRefreshTokenDto: InsertRefreshToken,
  ): Promise<void> {
    const { user, token } = insertRefreshTokenDto;

    const refreshToken = this.refreshTokenRepository.create({
      user,
      refreshToken: token,
    });

    await this.refreshTokenRepository.save(refreshToken);
  }

  public async validate(userId: number): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!refreshToken) {
      throw new Error('Invalidated Refresh Token');
    }
    return true;
  }

  public async invalidate(userId: number): Promise<void> {
    await this.refreshTokenRepository.delete({ user: { id: userId } });
  }
}
