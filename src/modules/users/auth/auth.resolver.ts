import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserQL } from 'src/common/models/user.model';
import { LogoutOutput } from './dto/log-out.output';
import { RefreshTokenOutput } from './dto/refresh-token.output';
import { SignInUserInput } from './dto/sign-in.input';
import { SignInOutput } from './dto/sign-in.output';
import { SignUpUserInput } from './dto/sign-up.input';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './service/auth.service';

@Resolver(() => UserQL)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserQL)
  signUp(@Args('signUpUserInput') signUpUserInput: SignUpUserInput) {
    return this.authService.signUp(signUpUserInput);
  }

  @Mutation(() => SignInOutput)
  @UseGuards(LocalAuthGuard)
  signIn(
    @Args('signInUserInput') signInUserInput: SignInUserInput,
    @Context() context: any,
  ): Promise<SignInOutput> {
    return this.authService.signIn(context.user, signInUserInput.deviceId);
  }

  @Mutation(() => LogoutOutput)
  @UseGuards(JwtAuthGuard)
  logOut(@Context() context: any): Promise<LogoutOutput> {
    return this.authService.invalidateToken(context.req.access_token);
  }

  @Query(() => RefreshTokenOutput)
  @UseGuards(JwtRefreshTokenGuard)
  refreshToken(@Context() context: any): Promise<RefreshTokenOutput> {
    return this.authService.refreshAccessToken(context.req.refresh_token);
  }
}
