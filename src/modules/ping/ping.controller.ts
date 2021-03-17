import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { BasicAuthGuard } from "../auth/basic-auth.guard";

@Controller()
export class PingController {
    @Get("ping/:value")
    @UseGuards(BasicAuthGuard)
    public ping(@Param("value") value: string) {
        return { pong: value };
    }

    @Post("ping")
    @HttpCode(HttpStatus.OK)
    public pingBody(@Body() body: { ping: string }) {
        return { pong: body.ping };
    }
}
