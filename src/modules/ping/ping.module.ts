import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PingController } from "./ping.controller";

@Module({
    imports: [AuthModule],
    controllers: [PingController],
})
export class PingModule {}
