export interface ValueObjectType {
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectType>{
    public _props: T
    protected constructor(protected props: T) {
        this._props = props
    }

    public equals(obj: any): boolean {
        if (obj === null || obj === undefined) {
            return false;
        }
        const vo = obj as ValueObject<T>

        if (vo.props === undefined) {
            return false
        }

        return JSON.stringify(this.props) === JSON.stringify(vo.props);
    }
}
