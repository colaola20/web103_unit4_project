import express from 'express'
import carsController from '../controllers/cars.js'

const router = express.Router()

router.get('/', carsController.getCars)
router.get(':carId', carsController.getCarById)

router.post('/', carsController.createCar)
router.delete('/:id', carsController.deleteCar)
router.patch('/:id', carsController.updateCar)

export default router