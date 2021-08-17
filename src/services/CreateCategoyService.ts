import { CategoriesRepository } from "../repositories/CategoriesRepository"


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

class CreateCategoryService {
  // private pra não precisar declarar e atribuir
  constructor(private categoriesRepository: CategoriesRepository) {}
  
  execute({ description, name }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name)

    if(categoryAlreadyExists) {
      // erro lançado pra quem fez a requisição. é assim que se lança erro dentro de service
      throw new Error('Category already exists')
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryService }