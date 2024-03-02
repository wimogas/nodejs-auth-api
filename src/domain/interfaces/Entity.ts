export default abstract class Entity {
    protected _id: string;
    protected data: any;

    public constructor(data: any, id: string) {
        this._id = id;
        this.data = data;
    }

    get id(): string {
        return this._id;
    }

    public getData(): any {
        return this.data;
    }
}