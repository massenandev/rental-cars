import { Router } from 'express'
import multer from 'multer'
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'


const categoriesRoutes = Router()

//configurações do que queremos 
const upload = multer({
  // receber o arquivo de categorias e armazenar numa pasta temporaria pra depois fazer a leitura dos dados da pasta, salva e deleta
  //destino
  dest: "./tmp"
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, createCategoryController.handle)

categoriesRoutes.get('/', listCategoriesController.handle)

//dentro do single, fica o nome que deve ser reconhecido pelo insomnia
categoriesRoutes.post('/import', ensureAuthenticated, ensureAdmin, upload.single('file'), importCategoryController.handle)

export { categoriesRoutes }