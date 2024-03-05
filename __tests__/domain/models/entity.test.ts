import {Entity} from "../../../src/domain/models/Entity";
interface PriceEntityType {
    id: string,
    amount: number,
    currency: string
}

class PriceEntity extends Entity<PriceEntityType> {
    public _id: string;
    public _amount: number;
    public _currency: string;
    private constructor(props: PriceEntityType) {
        super(props);
        this._id = props.id;
        this._amount = props.amount;
        this._currency = props.currency;
    }

    public static create(id: string, amount: number, currency: string): PriceEntity {
        return new PriceEntity({id, amount, currency})
    }
}

describe("Entity Class", () => {

    test("Entities are equal", () => {
        const price1 = PriceEntity.create("123",1, "euro");
        const price2 = PriceEntity.create("123",1, "euro");

        expect(price1.equals(price2)).toBe(true);

    });

    test("Entities are equal ONLY if ID is equal", () => {
        const price1 = PriceEntity.create("123",1, "euro");
        const price2 = PriceEntity.create("123",2, "dollar");

        expect(price1.equals(price2)).toBe(true);

    });

    test("Entities are not equal", () => {
        const price1 = PriceEntity.create("123",1, "euro");
        const price2 = PriceEntity.create("124", 1, "euro");

        expect(price1.equals(price2)).toBe(false);

    });
});