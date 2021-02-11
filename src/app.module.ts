import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PingModule } from "./modules/ping/ping.module";
import { ConfigModule } from "@nestjs/config";
import * as OpenApiValidator from "express-openapi-validator";
import { join } from "path";

@Module({
    imports: [ConfigModule.forRoot(), PingModule],
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
        });

        consumer.apply(...middlewares).forRoutes("*");
    }
}
