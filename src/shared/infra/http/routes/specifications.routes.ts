import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post('/', ensureAuthenticated, ensureAdmin, createSpecificationController.handle)

export { specificationsRoutes }