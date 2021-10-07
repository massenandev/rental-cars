import { Specification } from "../infra/typeorm/Specification";


interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  create({ description, name }: ICreateSpecificationDTO): Promise<void>
  findByName(name: string): Promise<Specification>
}

export { ISpecificationsRepository, ICreateSpecificationDTO }