import { Request, Response } from "express";
import { CreateCategoyUseCase } from "./CreateCategoryUseCase";


class CreateCategoryController {

  constructor(private createCategoryUseCase: CreateCategoyUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body

    this.createCategoryUseCase.execute({ name, description })

    return response.status(201).send()
  }
}

export { CreateCategoryController }