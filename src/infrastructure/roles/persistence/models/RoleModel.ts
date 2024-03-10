import {Schema, model, Model} from "mongoose";

interface IRole {
    id: string
    name: string
    permissions: any
}

type RoleModel = Model<IRole>;

const RoleSchema = new Schema<IRole>({
        id: {type: String, require: true },
        name: {type: String, require: true },
        permissions: [
            { type: Schema.Types.ObjectId, ref: 'Permission' }
        ],
    }
)

export default model<IRole, RoleModel>("Role", RoleSchema)

