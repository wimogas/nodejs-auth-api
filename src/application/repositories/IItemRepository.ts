import {Item} from "../../domain/Item";
import {IAddItemResult} from "../use-cases/items/AddItem";

export interface IItemRepository {
    add(item: Item): Promise<IAddItemResult>
}