import express from 'express'
import customItemsController from '../controllers/customItems.js'

const router = express.Router()

router.get('/', customItemsController.getCustomItems)
router.get('/:customItemsID', customItemsController.getCustomItemsById)


export default router