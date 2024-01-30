import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserQL } from 'src/common/models/user.model';
import { SignInUserInput } from './dto/sign-in.input';
import { SignUpUserInput } from './dto/sign-up.input';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TokensQl } from './models/token.model';
import { AuthService } from './service/auth.service';

@Resolver(() => UserQL)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserQL)
  signUp(@Args('signUpUserInput') signUpUserInput: SignUpUserInput) {
    return this.authService.signUp(signUpUserInput);
  }

  @Mutation(() => TokensQl)
  @UseGuards(LocalAuthGuard)
  signIn(
    @Args('signInUserInput') signInUserInput: SignInUserInput,
    @Context() context: any,
  ) {
    return this.authService.signIn(context.user);
  }
}
