import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

//instanciação de tudo o que se precisa
const categoriesRepository = CategoriesRepository.getInstance()

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export { createCategoryController }