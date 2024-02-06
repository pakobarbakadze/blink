import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '../types/enum/strategy.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthStrategy.JWT) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const request = ctx.req;

    const token = request.headers.authorization;
    request.access_token = token;

    return request;
  }
}
