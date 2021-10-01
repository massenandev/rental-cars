import multer  from 'multer'
import { resolve } from 'path'
import crypto from 'crypto'
// customizavel pra quem quiser utilizar o arquivo de upload
export default {
  
  // ta recebendo um folder pra quem tiver utilizando possa escolher o diretório pra salvar
  upload(folder: string) {
    return {
      //diskStorage permite com quem passe infos do destino onde quer salvar o upload e pode recriar o file name do arquivo 
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          // sobrescrever o file name
          const fileHash = crypto.randomBytes(16).toString("hex") // criar o hash pra não ter arquivos com nomes duplicados
          // criar o fileName baseado no hash com o name original
          const fileName = `${fileHash}-${file.originalname}` // concatena o hash com o nome do arquivo

          return callback(null, fileName)
        }
      })
    }
  }
}