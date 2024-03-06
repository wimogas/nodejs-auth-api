export abstract class ValueObject{

    public equals(obj: any): boolean {
        if (obj === null || obj === undefined) {
            return false;
        }
        return JSON.stringify(this) === JSON.stringify(obj);
    }
}