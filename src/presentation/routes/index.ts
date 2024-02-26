import {Router} from 'express'

import authMiddleware from '../../middlewares/AuthMiddleware';
import itemsRoutes from '../routes/items'

const router = Router()

router.use('/api/v1/items', authMiddleware.authenticate, itemsRoutes)

export default router