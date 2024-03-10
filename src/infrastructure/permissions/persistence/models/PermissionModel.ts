import {Schema, model, Model} from "mongoose";

interface IPermission {
    id: string;
    name: string;
}

type PermissionModel = Model<IPermission>;

const PermissionSchema = new Schema<IPermission>({
        id: {type: String, require: true },
        name: {type: String, require: true },
    }
)

export default model<IPermission, PermissionModel>("Permission", PermissionSchema)

