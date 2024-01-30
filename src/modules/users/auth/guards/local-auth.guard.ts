import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '../types/enum/strategy.enum';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthStrategy.LOCAL) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext();
    req.body = ctx.getArgs().signInUserInput;
    return req;
  }
}
