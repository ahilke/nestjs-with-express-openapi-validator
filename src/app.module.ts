import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import * as OpenApiValidator from "express-openapi-validator";
import { join } from "path";
import { AuthModule } from "./modules/auth/auth.module";
import { PingModule } from "./modules/ping/ping.module";
import { OpenApiExceptionFilter } from "./openapi-exception.filter";

@Module({
    imports: [ConfigModule.forRoot(), AuthModule, PingModule],
    providers: [{ provide: APP_FILTER, useClass: OpenApiExceptionFilter }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        const middlewares = OpenApiValidator.middleware({
            apiSpec: join(__dirname, "./openapi.yaml"),
            validateRequests: {
                allowUnknownQueryParameters: true,
                coerceTypes: false,
            },
            validateResponses: true,
            validateFormats: "full",
            validateSecurity: false,
        });

        consumer.apply(...middlewares).forRoutes("*");
    }
}
