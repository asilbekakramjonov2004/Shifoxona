import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const users = request.user;
    console.log(request.user);

    // if (!users) {
    //   throw new ForbiddenException('Foydalanuvchi aniqlanmadi');
    // }

    if (!requiredRoles.includes(users.role)) {
      throw new ForbiddenException(`Bu amal uchun ruxsat yo‘q: ${users.role}`);
    }

    return true;
  }
}
