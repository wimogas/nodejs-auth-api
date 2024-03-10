import {AggregateRoot} from "../common/AggregateRoot";
import {PermissionId} from "./PermissionId";



export class Permission extends AggregateRoot<PermissionId> {
    public name: string;

    private constructor(
        id: PermissionId,
        name: string) {
        super(id);
        this.name = name
    }

    public static create(data: any): Permission {
        const id = PermissionId.create(data.id)
        return new Permission(
            id,
            data.name
        )
    }
}