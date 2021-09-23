import { Category } from "../../entities/Category"
import { ICreateCategoryDTO } from "../ICategoriesRepository"

/**
 * DTO (data transfer object) - criar um objeto pra ser responsável pela transferência de dados entre uma camada/classe e outra
 * toda vez que precisar de um objeto que for receber informações vinda da rota, cria-se o dto 
 * pra pegar os valores da rota e receber nos repositórios
 */


// padrão de projeto SINGLETON - apenas uma instancia de uma classe (global)
// não se tem a preocupação de instanciação. deve ser utilizado a mesma instancia
// verificar se realmente a classe precisa ser um singleton ou se precisa ter mais de uma instância
class CategoriesRepository {
  private categories: Category[] 

  private static INSTANCE: CategoriesRepository

  // instanciar não será possível. somente esta classe poderá chamar o constructor
  private constructor(){
    this.categories = []
  }

  //responsável por criar uma instância ou repassar a instância pra quem estiver requisitando
  public static getInstance(): CategoriesRepository {
    if(!CategoriesRepository.INSTANCE){
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }

    return CategoriesRepository.INSTANCE
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category() 
  
    Object.assign(category, {
      name, 
      description,
      created_at: new Date()
    })
    
    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): Category {
    const category = this.categories.find(category => category.name === name)
    
    return category
  }
}

export { CategoriesRepository }