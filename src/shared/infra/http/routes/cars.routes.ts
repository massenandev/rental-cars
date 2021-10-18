import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { Router } from 'express'

const carsRoutes = Router()

let createCarController = new CreateCarController()

carsRoutes.post('/', createCarController.handle)

export { carsRoutes }