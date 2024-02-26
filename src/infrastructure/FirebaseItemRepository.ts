import {IItemRepository} from "../application/repositories/IItemRepository";
import {Item} from "../domain/Item";
import {db} from "../config/firebase-config";
import {IAddItemResult} from "../application/use-cases/items/AddItem";

export class FirebaseItemRepository implements IItemRepository {

    public async add(item: Item): Promise<IAddItemResult> {
        const result = await db.collection('test').add({
            name: item.name,
            userId: item.userId
        })

        return {
            itemId: result.id
        }
    }

}