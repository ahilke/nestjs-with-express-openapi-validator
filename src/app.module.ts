import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import * as OpenApiValidator from "express-openapi-validator";
import { PingModule } from "./modules/ping/ping.module";
import { OpenApiExceptionFilter } from "./openapi-exception.filter";
import openapiJson from "./openapi.json";

@Module({
    imports: [ConfigModule.forRoot(), PingModule],
    providers: [{ provide: APP_FILTER, useClass: OpenApiExceptionFilter }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        const middlewares = OpenApiValidator.middleware({
            apiSpec: openapiJson as any,
            validateRequests: {
                allowUnknownQueryParameters: true,
                coerceTypes: false,
            },
            validateResponses: true,
            validateFormats: "full",
        });

        consumer.apply(...middlewares).forRoutes("*");
    }
}
