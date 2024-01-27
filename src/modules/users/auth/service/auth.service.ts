import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../user.repository';
import { User } from '../../user/entities/user.entity';
import { SignUpUserInput } from '../dto/sign-up.input';
import { TokensQl } from '../models/token.model';
import { JwtPayload } from '../types/jwt-payload.type';
import { RefreshTokenStorage } from './refresh-token-storage.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenStorage: RefreshTokenStorage,
    private readonly configSercive: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(signInUserInput: SignUpUserInput): Promise<TokensQl> {
    const { username } = signInUserInput;

    const user = await this.userRepository.findOne({ where: { username } });

    const payload: JwtPayload = { sub: user.id, username: user.username };

    const [accessToken, refreshToken] = await this.signTokens(payload);

    await this.refreshTokenStorage.insert({ user, token: refreshToken });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  public async signUp(signUpUserInput: SignUpUserInput): Promise<User> {
    const { username, password } = signUpUserInput;

    const createdUser = this.userRepository.create({
      username,
      password,
    });

    return this.userRepository.save(createdUser);
  }

  public async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) throw new UnauthorizedException('Invalid username or password');

    if (await user.validatePassword(password)) {
      return user;
    }

    return null;
  }

  public async refreshAccessToken(
    authorization: string,
  ): Promise<{ access_token: string }> {
    const refreshToken = authorization.split(' ')[1];
    const decoded = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configSercive.get<string>('REFRESH_JWT_SECRET'),
    });
    await this.refreshTokenStorage.validate(decoded.sub);
    const payload = { sub: decoded.sub, username: decoded.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  public async invalidateToken(
    authorization: string,
  ): Promise<{ message: string }> {
    const token = authorization.split(' ')[1];
    const decoded = await this.jwtService.verifyAsync(token);
    await this.refreshTokenStorage.invalidate(decoded.sub);

    return { message: 'Token invalidated successfully' };
  }

  private signTokens(payload: JwtPayload) {
    return Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configSercive.get<string>('REFRESH_JWT_SECRET'),
        expiresIn: '1w',
      }),
    ]);
  }
}
