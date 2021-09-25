import { Router } from 'express'
import multer from 'multer'

import createCategoryController  from '../modules/cars/useCases/createCategory'
import { importCategoryController } from '../modules/cars/useCases/importCategory'
import { listCategoriesController } from '../modules/cars/useCases/listCategories'


const categoriesRoutes = Router()

//configurações do que queremos 
const upload = multer({
  // receber o arquivo de categorias e armazenar numa pasta temporaria pra depois fazer a leitura dos dados da pasta, salva e deleta
  //destino
  dest: "./tmp"
})

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController().handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController.handle(request, response)
})

//dentro do single, fica o nome que deve ser reconhecido pelo insomnia
categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response)
})

export { categoriesRoutes }