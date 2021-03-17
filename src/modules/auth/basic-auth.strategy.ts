import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport";

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(Strategy, "basic-auth") {
    private challenge = "Basic";

    public constructor(private configService: ConfigService) {
        super();
    }

    public authenticate(req: Request): void {
        const authorization = req.headers.authorization;
        console.log(this.challenge);
        if (authorization === undefined) {
            return this.fail(this.challenge);
        }

        const authorizationMatch = authorization.match(/Basic (.*)/);
        if (authorizationMatch === null) {
            return this.fail(this.challenge);
        }
        const credentials = Buffer.from(authorizationMatch[1], "base64").toString();

        const credentialsMatch = credentials.match(/(.*):(.*)/);
        if (credentialsMatch === null) {
            return this.fail(this.challenge);
        }

        const username = credentialsMatch[1];
        const password = credentialsMatch[2];
        if (
            this.configService.get("BASIC_AUTH_USER") !== username ||
            this.configService.get("BASIC_AUTH_PASSWORD") !== password
        ) {
            return this.fail(this.challenge);
        }

        return this.success({ username, password });
    }
}
