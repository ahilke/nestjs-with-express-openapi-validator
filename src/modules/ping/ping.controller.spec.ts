import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "../../app.module";

describe("PingController", () => {
    let testApplication: INestApplication;

    afterEach(async () => {
        await testApplication.close();
    });

    describe("ping", () => {
        // the second execution of this test fails
        test.each([1, 2])("ping", async () => {
            testApplication = await createTestApplication();

            await request(testApplication.getHttpServer()).get(`/ping/GNU Terry Pratchett`).expect(200, {
                pong: "GNU Terry Pratchett",
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
