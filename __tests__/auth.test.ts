import request from "supertest";

import app from "../src/app";

describe("Authentication", () => {
    const validId= "65e0936b330d7e4c8d503cec"
    const validToken = "eyJhbGciOiJSUzI1NjA4NDc"
    const validUserName = 'User'
    const validEmail = 'user@gmail.com'
    const validPassword = 'WG7Nv3)W!P92'

    describe("POST /api/v1/auth/register", () => {
        test("Registers a user", async () => {
            let data = {
                name: validUserName,
                email: validEmail,
                password: validPassword
            }
            const res = await request(app).post("/api/v1/auth/register").send(data);

            expect(201)
            expect(res.body).toEqual({
                id: validId,
                name: validUserName,
                email: validEmail,
                token: validToken
            });
        });

        describe("Business rules: Name", () => {
            test("Returns error if name is missing", async () => {
                let data = {
                    email: validEmail,
                    password: validPassword
                }
                const res = await request(app).post("/api/v1/auth/register").send(data);

                expect(400)
                expect(res.body).toEqual({
                    message: "Name is required"
                });
            });
        })
        describe("Business rules: Email", () => {
            test("Returns error if email is missing", async () => {
                let data = {
                    name: validUserName,
                    password: validPassword
                }
                const res = await request(app).post("/api/v1/auth/register").send(data);

                expect(400)
                expect(res.body).toEqual({
                    message: "Email is required"
                });
            });
            test("Returns error if email is not valid", async () => {
                let data = {
                    name: validUserName,
                    email: "email",
                    password: validPassword
                }
                const res = await request(app).post("/api/v1/auth/register").send(data);

                expect(400)
                expect(res.body).toEqual({
                    message: "Email is not valid"
                });
            });
        })
        describe("Business rules: Password", () => {
            test("Returns error if password is missing", async () => {
                let data = {
                    name: validUserName,
                    email: validEmail,
                }
                const res = await request(app).post("/api/v1/auth/register").send(data);

                expect(400)
                expect(res.body).toEqual({
                    message: "Password is required"
                });
            });
            test("Returns error if password is not valid", async () => {
                let data = {
                    name: validUserName,
                    email: validEmail,
                    password: "123123"
                }
                const res = await request(app).post("/api/v1/auth/register").send(data);

                expect(400)
                expect(res.body).toEqual({
                    message: "Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol"
                });
            });
        })
    });

});