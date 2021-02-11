import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../../app.module";

describe("PingController", () => {
    let testApplication: INestApplication;

    afterEach(async () => {
        await testApplication.close();
    });

    describe("ping", () => {
        test("ping", async () => {
            testApplication = await createTestApplication();

            await request(testApplication.getHttpServer()).get(`/ping/GNU Terry Pratchett`).expect(200, {
                pong: "GNU Terry Pratchett",
            });
        });

        test("Bad HTTP Method", async () => {
            testApplication = await createTestApplication();

            await request(testApplication.getHttpServer())
                .post(`/ping/GNU Terry Pratchett`)
                .expect(405, {
                    name: "Method Not Allowed",
                    status: 405,
                    path: "/",
                    errors: [{ path: "/", message: "POST method not allowed" }],
                });
        });
    });
});

async function createTestApplication(): Promise<INestApplication> {
    const testModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    return testModule.createNestApplication().init();
}
