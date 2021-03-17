import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BasicAuthStrategy } from "./basic-auth.strategy";

@Module({
    imports: [ConfigModule],
    providers: [BasicAuthStrategy],
})
export class AuthModule {}
