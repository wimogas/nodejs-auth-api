import {AggregateRoot} from "../common/AggregateRoot";
import {RoleId} from "./RoleId";

export class Role extends AggregateRoot<RoleId> {
    public name: string;

    private constructor(
        id: RoleId,
        name: string) {
        super(id);
        this.name = name
    }

    public static create(data: any): Role {
        const id = RoleId.create(data.id)
        return new Role(
            id,
            data.name,
        )
    }
}