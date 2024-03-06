import {Schema, model, Model} from "mongoose";

interface IAuthUser {
    id: string;
    email: string,
    password: string
}

type AuthUserModel = Model<IAuthUser>;

const authUserSchema = new Schema<IAuthUser>({
        id: {type: String, require: true },
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true},
    }
)

export default model<IAuthUser, AuthUserModel>("AuthUser", authUserSchema)

