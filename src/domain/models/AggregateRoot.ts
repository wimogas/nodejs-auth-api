import {Entity} from "./Entity";

export interface AggregateRootType {
    id: string;
    [index: string]: any;
}

export abstract class AggregateRoot<T extends AggregateRootType> extends Entity<T>{
    public _props: T
    protected constructor(protected props: T) {
        super(props);
        this._props = props
    }
}
