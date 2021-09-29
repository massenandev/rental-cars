export class AppError {
  public readonly message: string

  public readonly statusCode: number

  // default será erro 400
  constructor(message: string, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }


}