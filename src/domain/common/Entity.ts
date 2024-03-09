import {ValueObject} from "./ValueObject";

export abstract class Entity<T extends ValueObject>{
    public id: T

    protected constructor(id: T) {
        this.id = id
    }

    public equals(obj: any): boolean {
        if (obj === null || obj === undefined) {
            return false;
        }
        const vo = obj as Entity<T>
        if (vo.id === undefined) {
            return false
        }
        return JSON.stringify(this.id) === JSON.stringify(vo.id);
    }
}
