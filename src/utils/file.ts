import fs from 'fs'

export const deleteFile = async(filename: string) => {
  // stat verifica se existe aquele arquivo no diretório que for passado
  try {
    await fs.promises.stat(filename)
  } catch {
    return
  }

  // unlink remove o arquivo, caso ele exista
  await fs.promises.unlink(filename)
}