import {Schema, model, Model} from "mongoose";

interface IUser {
    id: string;
    email: string,
    password: string,

}

type UserModel = Model<IUser>;

const UserSchema = new Schema<IUser>({
        id: {type: String, require: true },
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true},
    }
)

export default model<IUser, UserModel>("User", UserSchema)

