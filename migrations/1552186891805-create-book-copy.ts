import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateBookCopy1552186891805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'book_copy',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: true
          },
          {
            name: 'price',
            type: 'int',
            isNullable: true
          },
          {
            name: 'userId',
            type: 'int'
          },
          {
            name: 'bookId',
            type: 'int'
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'book_copy',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE'
      })
    );

    await queryRunner.createForeignKey(
      'book_copy',
      new TableForeignKey({
        columnNames: ['bookId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'book',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('book_copy');
  }
}
