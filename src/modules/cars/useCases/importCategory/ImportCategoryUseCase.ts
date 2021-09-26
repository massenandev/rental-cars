import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import csvParse from 'csv-parse'
// file stream
import fs from 'fs'
import { inject, injectable } from 'tsyringe';

interface IImportCategory {
  name: string
  description: string
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  
  // responsável somente por fazer a leitura das categorias
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
    
      const categories: IImportCategory[] = []

      //o csv ja entende que a virgula é o delimitador. o csvParse é responsável por ler linha por linha do arquivo. 
      // isso é possível porque a cada pedaço lido, estamos passando o pipe
      const parseFile = csvParse()
      // pipe pega o que tá sendo lido do stream e dentro dele, ele joga o que foi lido pra o lugar determinado
      // a cada chunck lido, o pipe vai enviar pra onde queremos que seja enviado
      stream.pipe(parseFile)

      parseFile.on('data', async (line) => {
        // ["name", "description"]
        // desestruturação para que cada posição vai colocar na variável
        const [name, description] = line
        categories.push({
          name,
          description
        })
      })
      .on('end', () => {
        //unlink é responsável pela remoção de arquivo
        fs.promises.unlink(file.path)
        resolve(categories)
      })
      .on('error', (err) => {
        reject(err)
      })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    // com o async/await, ele vai esperar a finalização para inserir no banco de dados
    const categories = await this.loadCategories(file)
    // o map percorre o array e da pra fazer umas manipulações
    categories.map(async (category) => {
      const { name, description } = category

      const existCategory = await this.categoriesRepository.findByName(name)

      if(!existCategory){
        await this.categoriesRepository.create({
          name, 
          description
        })
      }
    }) 
  }
}

export { ImportCategoryUseCase }