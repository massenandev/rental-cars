import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError'

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void> {
  
  const authHeader = request.headers.authorization

  if(!authHeader) {
    throw new AppError("Token missing", 401)
  }

  // bearer token - tem que quebrar essa informação, porque não importa o bearer, precisamos do token
  // criar um array com duas posuções, que na posição [0] vai vir o bearer e no [1], o token de fato
  const [, token] = authHeader.split(" ") // ignora a primeira posição e o que vier na posição [1], armazene numa const chamada token
  //verificar se o token é válido
  
  try {
    const { sub: user_id } = verify(token, "cffc1b3daada1c85a7b326f2a6e41386") as IPayload // caso de sucesso, ele vai embora. caso de erro, ele lança exception
    
    const usersRepository = new UsersRepository()
    const user = usersRepository.findById(user_id)

    if(!user) {
      throw new AppError("User does not exists", 401)
    }

    //precisa colocar o user dentro do request. 
    // É preciso sobrescrever (escrever a tipagem desse user pra dentro do express) porque n tem esse tipo 'user' no request
    // @types/express/index.d.ts
    request.user = {
      id: user_id
    }

    next()
  } catch {
    throw new AppError("Invalid token", 401)
  }

}