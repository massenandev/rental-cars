import { getRepository, Repository } from "typeorm"
import { Category } from "../../entities/Category"
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository"
class CategoriesRepository implements ICategoriesRepository {

  private repository: Repository<Category>

  constructor(){
    //continua tendo acesso aos atributos/metodos do repository do typeorm, mas agora de forma mais restrita, deixando somente pra dentro da classe
    this.repository = getRepository(Category)
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name
      //created_at o banco que é encarregado de criar
    })
    
    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    //find retorna uma promise de category
    const categories = this.repository.find()
    
    return categories
  }

  async findByName(name: string): Promise<Category> {
    // select * from categories where name = "name" limit 1 (o find one bota esse limit)
    const category = await this.repository.findOne({ name })
    
    return category
  }
}

export { CategoriesRepository }