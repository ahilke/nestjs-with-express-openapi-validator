import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

@Injectable()
export class BasicAuthGuard extends AuthGuard("basic-auth") {
    handleRequest(err, user, info: string | undefined, context: ExecutionContext, maybeStatus: number | undefined) {
        if (user !== false) {
            return user;
        }

        const status = maybeStatus ?? 401;
        const response = context.switchToHttp().getResponse<Response>();
        response.status(status).header("WWW-Authenticate", info);
        throw new UnauthorizedException();
    }
}
