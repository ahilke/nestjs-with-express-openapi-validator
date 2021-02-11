import { Controller, Get, Param } from "@nestjs/common";

@Controller()
export class PingController {
    @Get("ping/:value")
    public ping(@Param("value") value: string) {
        return { pong: value };
    }
}
