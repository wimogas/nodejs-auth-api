import {Router} from 'express'

import authRoutes from './authentication'

const router = Router()

router.use('/api/v1/auth', authRoutes)


export default router