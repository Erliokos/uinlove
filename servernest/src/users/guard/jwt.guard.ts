import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../services/user/user.service';

export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private userService: UserService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    const token = parseAuthHeader(ctx.req.headers.authorization).value;

    if (
      token === undefined ||
      !(await this.userService.verifyAuthenticationToken(token))
    ) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

function parseAuthHeader(header: string) {
  const matches = header.match(/(\S+)\s+(\S+)/);

  if (matches) {
    return { scheme: matches[1], value: matches[2] };
  }

  return null;
}
