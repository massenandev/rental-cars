import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default(): CreateCategoryController => {
  //dentro de uma função, tem-se o controle melhor de onde essas informações vão ser criadas/instanciadas
  const categoriesRepository = new CategoriesRepository()

  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
  
  const createCategoryController = new CreateCategoryController(createCategoryUseCase)
  
  return createCategoryController
}

