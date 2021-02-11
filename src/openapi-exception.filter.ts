import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

// FixMe: Use error types from index file
import { HttpError } from "express-openapi-validator/dist/framework/types";

@Catch(HttpError)
export class OpenApiExceptionFilter implements ExceptionFilter {
    catch(error: HttpError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(error.status).json(error);
    }
}
