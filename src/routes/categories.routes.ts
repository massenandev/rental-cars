import { Router } from 'express'
import { PostgresCategoriesRepository } from '../repositories/PostgresCategoriesRepository'
import { CreateCategoryService } from '../services/CreateCategoyService'

const categoriesRoutes = Router()

const categoriesRepository = new PostgresCategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const createCategoryService = new CreateCategoryService(categoriesRepository)

  createCategoryService.execute({ name, description })

  return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepository.list()

  return response.json(all)
})

export { categoriesRoutes }