import { inject, injectable } from "tsyringe"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { hash } from "bcryptjs"
@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if(userAlreadyExists) {
      throw new Error("User already exists")
    }

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email, 
      password: passwordHash, 
      driver_license
    })
  }
}

export { CreateUserUseCase }