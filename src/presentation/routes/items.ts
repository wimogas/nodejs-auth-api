import express from 'express'
import {InMemoryItemRepository} from "../../infrastructure/InMemoryItemRepository";
import {FirebaseItemRepository} from "../../infrastructure/FirebaseItemRepository";
import {ItemController} from "../controllers/ItemController";

const inMemoryRepo = new InMemoryItemRepository()
const firebaseRepo = new FirebaseItemRepository()

const itemController = new ItemController(firebaseRepo)

const router = express.Router()

router.post('/', (req, res) => itemController.addItem(req,res))

export default router