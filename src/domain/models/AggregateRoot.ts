import {Entity} from "./Entity";
import {ValueObject} from "./ValueObject";

export abstract class AggregateRoot<T extends ValueObject> extends Entity<T>{
    protected constructor(id: T) {
        super(id);
    }
}
