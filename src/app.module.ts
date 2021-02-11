import { Module } from "@nestjs/common";
import { PingModule } from "./modules/ping/ping.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot(), PingModule],
})
export class AppModule {}
