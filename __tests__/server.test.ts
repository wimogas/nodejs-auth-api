import request from "supertest";

import app from "../src/app";

describe("INIT", () => {
    describe("GET /test", () => {
        test("System check", async () => {
            const res = await request(app).get("/test");
            expect(res.body).toEqual({ message: "All systems nominal" });
        });
    });
});
