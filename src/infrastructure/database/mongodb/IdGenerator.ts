import mongoose from "mongoose";
import {IIdGenerator} from "../../../application/common/interfaces/persistance/IIdGenerator";

export class IdGenerator implements IIdGenerator{
    public generateId() {
        return new mongoose.Types.ObjectId().toString()
    }
}