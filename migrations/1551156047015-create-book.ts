import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBook1551156047015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'book',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'subtitle',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'numberOfPages',
            type: 'int',
            isNullable: true
          },
          {
            name: 'publishDate',
            type: 'date',
            isNullable: true
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('book');
  }
}
