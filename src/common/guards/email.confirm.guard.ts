import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import RequestWithUser from "../../auth/dto/req-with-user.dto";

@Injectable()

export class EmailConfirmGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean  {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    if (!request.user?.isEmailConfirmed) {
      throw new UnauthorizedException('Confirm your email first');
    }

    return true;
  }
}