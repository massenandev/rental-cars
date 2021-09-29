import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/AppError"

import { IUsersRepository } from "../../repositories/IUsersRepository"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    //se o user existe
    if(!user) {
      throw new AppError("Email or password incorrect")
    }
    // se a senha correta
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new AppError("Email or password incorrect")
    }

    const token = sign({}, "cffc1b3daada1c85a7b326f2a6e41386", {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name, 
        email: user.email
      }
    }

    //gerar o jwt
    return tokenReturn
  }
}

export { AuthenticateUserUseCase }