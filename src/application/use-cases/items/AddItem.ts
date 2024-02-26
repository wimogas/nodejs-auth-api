import {Item} from "../../../domain/Item";
import {IItemRepository} from "../../repositories/IItemRepository";

interface IAddItemDto {
    name: string,
    userId: string,
}

export interface IAddItemResult {
    itemId: string
}

export class AddItem {
    public constructor(private readonly _itemRepo: IItemRepository ) {}
    public async execute(input: IAddItemDto): Promise<IAddItemResult> {
        const item = new Item(input.name, input.userId)

        const result = await this._itemRepo.add(item)

        if (!result) {
            throw new Error("Could not save item")
        }

        return result
    }
}