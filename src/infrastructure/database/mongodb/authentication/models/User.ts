import {Schema, InferSchemaType, model} from "mongoose";

const userSchema = new Schema({
        id: {type: String, require: true },
        name: {type: String, require: true},
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true, select: false},
    }
)

type UserType = InferSchemaType<typeof userSchema>

export default model<UserType>("User", userSchema)