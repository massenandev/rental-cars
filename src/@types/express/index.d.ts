// foi necessário criar esse arquivo pra sobrescrever, adicionando nas tipagens o User

declare namespace Express {
  export interface Request {
    user: {
      id: string
    }
  }
}