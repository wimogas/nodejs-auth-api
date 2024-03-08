import {Schema, model, Model} from "mongoose";

interface IUser {
    id: string;
    email: string,
    password: string,

}

type DbUserModel = Model<IUser>;

const UserSchema = new Schema<IUser>({
        id: {type: String, require: true },
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true},
    }
)

export default model<IUser, DbUserModel>("User", UserSchema)

