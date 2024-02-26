import {IItemRepository} from "../application/repositories/IItemRepository";
import {Item} from "../domain/Item";
import {IAddItemResult} from "../application/use-cases/items/AddItem";
import {randomUUID} from "crypto";

export class InMemoryItemRepository implements IItemRepository {

    private readonly _items: Item[] = []
    public async add(item: Item): Promise<IAddItemResult> {
        this._items.push(item)
        return {
            itemId: randomUUID()
        }
    }

}