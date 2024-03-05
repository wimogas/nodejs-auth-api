import {AggregateRoot} from "../../../src/domain/models/AggregateRoot";
interface PriceAggregateRootType {
    id: string,
    amount: number,
    currency: string
}

class PriceAggregateRoot extends AggregateRoot<PriceAggregateRootType> {
    public _id: string;
    public _amount: number;
    public _currency: string;
    private constructor(props: PriceAggregateRootType) {
        super(props);
        this._id = props.id;
        this._amount = props.amount;
        this._currency = props.currency;
    }

    public static create(id: string, amount: number, currency: string): PriceAggregateRoot {
        return new PriceAggregateRoot({id, amount, currency})
    }
}

describe("Aggregate Root Class", () => {

    test("Aggregate Root are equal", () => {
        const price1 = PriceAggregateRoot.create("123",1, "euro");
        const price2 = PriceAggregateRoot.create("123",1, "euro");

        expect(price1.equals(price2)).toBe(true);

    });

    test("Aggregate Root are equal ONLY if ID is equal", () => {
        const price1 = PriceAggregateRoot.create("123",1, "euro");
        const price2 = PriceAggregateRoot.create("123",2, "dollar");

        expect(price1.equals(price2)).toBe(true);

    });

    test("Aggregate Root are not equal", () => {
        const price1 = PriceAggregateRoot.create("123",1, "euro");
        const price2 = PriceAggregateRoot.create("124", 1, "euro");

        expect(price1.equals(price2)).toBe(false);

    });
});