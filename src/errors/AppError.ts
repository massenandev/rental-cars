export class AppError {
  public readonly message: string

  public readonly statusCode: number

  // default será erro 400
  // com o erro customizado, da pra controlar melhor o status do erro e a msg
  constructor(message: string, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }


}