import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe('Auth', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase
  let usersRepositoryInMemory: UsersRepositoryInMemory
  let createUserUseCase: CreateUserUseCase

  describe('Authenticate User', () => {
    beforeEach(() => {
      usersRepositoryInMemory = new UsersRepositoryInMemory()
      authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
      createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    });

    it('should be possible to auth an user', async () => {
      const user: ICreateUserDTO = {
        driver_license: "000123",
        email: "user@test.com",
        password: "1234",
        name: "Test"
      }

      await createUserUseCase.execute(user)

      const result = await authenticateUserUseCase.execute({ 
        email: user.email,
        password: user.password
      })

      expect(result).toHaveProperty("token")
    });    

    it('should not be able to auth a nonexistent user', async () => {
      expect(async () => {
        await authenticateUserUseCase.execute({ 
          email: "fake@test.com",
          password: "any"
        })
      }).rejects.toBeInstanceOf(AppError)
    });
    
    it('should not be able to auth with incorrect password', async () => {
      expect(async ()=> {
        const user: ICreateUserDTO = {
          driver_license: "000999",
          email: "newuser@test.com",
          password: "0101",
          name: "Test Error"
        }

        await createUserUseCase.execute(user)

        await authenticateUserUseCase.execute({ 
          email: user.email,
          password: "incorrect password"
        })
      }).rejects.toBeInstanceOf(AppError)
    });
  });
})