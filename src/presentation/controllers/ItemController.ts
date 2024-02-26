import {Request, Response} from "express";
import {AddItem, IAddItemResult} from "../../application/use-cases/items/AddItem";
import {IItemRepository} from "../../application/repositories/IItemRepository";

export class ItemController {

    public constructor(private readonly _itemRepo: IItemRepository) {}
    public async addItem(req: Request, res: Response): Promise<void> {

        const addItemUseCase = new AddItem(this._itemRepo)

        const response: IAddItemResult = await addItemUseCase.execute({
            name: req.body.name,
            userId: "fakeID"
        })

        res.json({
            id: response.itemId
        })

    }
}