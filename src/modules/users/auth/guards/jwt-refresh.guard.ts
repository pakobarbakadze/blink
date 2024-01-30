import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '../types/enum/strategy.enum';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard(
  AuthStrategy.JWT_REFRESH_TOKEN,
) {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const request = ctx.req;

    const token = request.headers.authorization; // assuming the token is sent in the Authorization header
    request.refresh_token = token;

    return request;
  }
}
