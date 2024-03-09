import mongoose from "mongoose";
import {IIdGeneratorService} from "../interfaces";

export class IdGeneratorService implements IIdGeneratorService{
    public generateId() {
        return new mongoose.Types.ObjectId().toString()
    }

    public verifyId(id: any): boolean {
        return mongoose.Types.ObjectId.isValid(id)
    }
}