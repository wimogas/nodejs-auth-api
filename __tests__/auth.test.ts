import request from "supertest";

import app from "../src/app";

describe("Authentication", () => {

    describe("POST /api/v1/auth/register", () => {
        test("Registers a user", async () => {
            let data = {
                name: "user",
                email: "user@mail.com",
                password: "123123"
            }
            const res = await request(app).post("/api/v1/auth/register").send(data);

            expect(201)
            expect(res.body).toEqual({
                id: "65e0936b330d7e4c8d503cec",
                name: "user",
                email: "user@mail.com",
                token: "eyJhbGciOiJSUzI1NjA4NDc"
            });
        });

        test("Returns error if name is missing", async () => {
            let data = {
                email: "user@mail.com",
                password: "123123"
            }
            const res = await request(app).post("/api/v1/auth/register").send(data);

            expect(400)
            expect(res.body).toEqual({
                message: "Name is required"
            });
        });

        test("Returns error if email is missing", async () => {
            let data = {
                name: "user",
                password: "123123"
            }
            const res = await request(app).post("/api/v1/auth/register").send(data);

            expect(400)
            expect(res.body).toEqual({
                message: "Email is required"
            });
        });

        test("Returns error if password is missing", async () => {
            let data = {
                name: "user",
                email: "user@mail.com",
            }
            const res = await request(app).post("/api/v1/auth/register").send(data);

            expect(400)
            expect(res.body).toEqual({
                message: "Password is required"
            });
        });
    });

});