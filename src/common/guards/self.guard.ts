import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class JwtSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (user.role === 'superadmin') {
      return true;
    }else if (user.role === "admin") {
      return true;
    }

    if (user.id !== +req.params.id) {
      throw new ForbiddenException({
        message: "Ruxsat etilmagan foydalanuvchi",
      });
    }

    return true;
  }
}
