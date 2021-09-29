import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/AppError"

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IRequest {
  name: string
  description: string
}

/**
 * [v] Definir o tipo de retorno
 * [v] Alterar o retorno do erro
 * [v] Acessar o repositorio
 */

// o service não precisa conhecer o request nem a response porque caso passe a não usar o express, tem que modificar tudo
//o service é o alto nível. a camada mais perto do domínio. as rotas é de baixo nível - mais perto do contato do user
// o service precisa somente de um repository q faça um list, edit, o que seja
// não importa pro service se vc tá usando dados em memória, postgresql, mango, etc
// inversão de dependencia - ao inves de o service ter a responsabilidade de ter a dependência, agora a responsabilidade fica pra quem chamar o service

@injectable()
class CreateCategoryUseCase {
  // private pra não precisar declarar e atribuir
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  
  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if(categoryAlreadyExists) {
      // erro lançado pra quem fez a requisição. é assim que se lança erro dentro de service
      throw new AppError('Category already exists')
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }