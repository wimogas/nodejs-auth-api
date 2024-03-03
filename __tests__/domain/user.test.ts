import User from "../../src/domain/User";

describe("User business rules", () => {
    const mockUser = {
        id: "65e4631daeab21836c7be675",
        name: "User",
        email: "user@mail.com",
        password: "9X8zMJ0XctMpo!"
    }

    test("User ID is valid", () => {
        const user = User.create({
            name: mockUser.name,
            email: mockUser.email,
            password: mockUser.password
        }, mockUser.id)
        expect(user.id).toEqual("65e4631daeab21836c7be675")
    });

    test("User Name is valid", () => {
        const user = User.create({
            name: mockUser.name,
            email: mockUser.email,
            password: mockUser.password
        }, mockUser.id)
        expect(user.getName).toEqual("User")
    });

    test("User Email is valid", () => {
        const user = User.create({
            name: mockUser.name,
            email: mockUser.email,
            password: mockUser.password
        }, mockUser.id)
        expect(user.getEmail).toEqual("user@mail.com")
    });

    test("User Password is valid", () => {
        const user = User.create({
            name: mockUser.name,
            email: mockUser.email,
            password: mockUser.password
        }, mockUser.id)
        expect(user.getPassword).toEqual("9X8zMJ0XctMpo!")
    });
});
