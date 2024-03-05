export interface EntityType {
    id: string;
    [index: string]: any;
}

export abstract class Entity<T extends EntityType>{
    public _props: T
    protected constructor(protected props: T) {
        this._props = props
    }

    public equals(obj: any): boolean {
        if (obj === null || obj === undefined) {
            return false;
        }
        const vo = obj as Entity<T>

        if (vo.props === undefined) {
            return false
        }

        return JSON.stringify(this.props.id) === JSON.stringify(vo.props.id);
    }
}
