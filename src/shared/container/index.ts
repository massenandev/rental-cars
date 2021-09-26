import { container } from "tsyringe"
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"

// criacao de registro de singleton apontando pra o CategoriesRepository
// toda vez q tiver uma implementação ICategories que dentro da implementação tiver uma injeção apontando pra esse nome,
// deverá chamar essa classeimport { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
// import { CreateCategoryController } from "./CreateCategoryController";
// import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// export default(): CreateCategoryController => {
//   //dentro de uma função, tem-se o controle melhor de onde essas informações vão ser criadas/instanciadas
//   const categoriesRepository = new CategoriesRepository()

//   const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
  
//   const createCategoryController = new CreateCategoryController(createCategoryUseCase)
  
//   return createCategoryController
// }

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
// import { CreateCategoryController } from "./CreateCategoryController";
// import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// export default(): CreateCategoryController => {
//   //dentro de uma função, tem-se o controle melhor de onde essas informações vão ser criadas/instanciadas
//   const categoriesRepository = new CategoriesRepository()

//   const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
  
//   const createCategoryController = new CreateCategoryController(createCategoryUseCase)
  
//   return createCategoryController
// }


container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository", 
  CategoriesRepository
)