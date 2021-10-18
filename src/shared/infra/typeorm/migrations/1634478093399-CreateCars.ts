import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCars1634478093399 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "description",
            type: "varchar"
          },
          {
            name: "daily_rate",
            type: "numeric"
          },
          {
            name: "available",
            type: "boolean",
            default: true
          },
          {
            name: "license_plate",
            type: "varchar"
          },
          {
            name: "fine_amount",
            type: "numeric"
          },
          {
            name: "brand",
            type: "varchar"
          },
          {
            name: "category_id",
            type: "uuid",
            isNullable: true
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          }
        ],
        foreignKeys: [
          {
            //nome pra ter referencia dentro do banco de dados. logicamente tem que criar uma FK que não exista: nome da coluna + nome da tabela
            name: "FKCategoryCar",
            //tabela pai
            referencedTableName: "categories",
            //quando chamar o category id, faça referencia ao id
            referencedColumnNames: ["id"],
            //referencia pra essa coluna
            columnNames: ["category_id"],
            // quando a tabela pai sofrer alteração (ao deletar), faça:
            onDelete: "SET NULL",
            onUpdate: "SET NULL"
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars")
  }
}
