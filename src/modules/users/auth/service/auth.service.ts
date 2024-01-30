import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user.entity';
import { UserRepository } from '../../user/user.repository';
import { RefreshTokenOutput } from '../dto/refresh-token.output';
import { SignUpUserInput } from '../dto/sign-up.input';
import { JwtPayload } from '../types/type/jwt-payload.type';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly configSercive: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(
    user: User,
    deviceId: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload: JwtPayload = { sub: user.id, username: user.username };

    const [accessToken, refreshToken] = await this.signTokens(payload);

    await this.refreshTokenService.insert({
      user,
      deviceId,
      token: refreshToken,
    });

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
  ): Promise<RefreshTokenOutput> {
    const refreshToken = authorization.split(' ')[1];
    const decoded = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configSercive.get<string>('REFRESH_JWT_SECRET'),
    });
    await this.refreshTokenService.validate(decoded.sub);
    const payload = { sub: decoded.sub, username: decoded.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  public async invalidateToken(
    authorization: string,
  ): Promise<{ message: string }> {
    const token = authorization.split(' ')[1];
    const decoded = await this.jwtService.verifyAsync(token);
    await this.refreshTokenService.invalidate(decoded.sub);

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
