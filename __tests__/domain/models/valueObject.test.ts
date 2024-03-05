import {ValueObject} from "../../../src/domain/models/ValueObject";
interface PriceType {
    amount: number,
    currency: string
}

class Price extends ValueObject<PriceType> {
    public _amount: number;
    public _currency: string;
    private constructor(props: PriceType) {
        super(props);
        this._amount = props.amount;
        this._currency = props.currency;
    }

    public static create(amount: number, currency: string): Price {
        return new Price({amount, currency})
    }
}

describe("ValueObject Class", () => {

    test("ValueObjects are equal", () => {
        const price1 = Price.create(1, "euro");
        const price2 = Price.create(1, "euro");

        expect(price1).toEqual(price2);
        expect(price1.equals(price2)).toBe(true);

    });

    test("ValueObjects are not equal", () => {
        const price1 = Price.create(1, "euro");
        const price2 = Price.create(2, "euro");

        const equalize = price1 === price2

        expect(equalize).toBe(false);
        expect(price1.equals(price2)).toBe(false);

    });

    test("ValueObjects are not equal", () => {
        const price1 = Price.create(1, "euro");
        const price2 = Price.create(1, "dollar");

        const equalize = price1 === price2

        expect(equalize).toBe(false);
        expect(price1.equals(price2)).toBe(false);

    });
});