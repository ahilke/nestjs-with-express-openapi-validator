import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport";

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(Strategy, "basic-auth") {
    public constructor(private configService: ConfigService) {
        super();
    }

    public authenticate(req: Request) {
        const authorization = req.headers.authorization;
        if (authorization === undefined) {
            this.fail();
        }

        const authorizationMatch = authorization.match(/Basic (.*)/);
        if (authorizationMatch === null) {
            this.fail();
        }
        const credentials = Buffer.from(authorizationMatch[1], "base64").toString();

        const credentialsMatch = credentials.match(/(.*):(.*)/);
        if (credentialsMatch === null) {
            this.fail();
        }

        const username = credentialsMatch[1];
        const password = credentialsMatch[2];
        if (
            this.configService.get("BASIC_AUTH_USER") !== username ||
            this.configService.get("BASIC_AUTH_PASSWORD") !== password
        ) {
            this.fail();
        }

        this.success({ username, password });
    }
}
