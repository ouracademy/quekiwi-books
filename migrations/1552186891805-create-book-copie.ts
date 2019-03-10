import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class CreateBookCopie1552186891805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'book_copie',
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
          }
        ]
      })
    );
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'user',
        type: 'int'
      })
    );

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE'
      })
    );
    await queryRunner.addColumn(
      'book',
      new TableColumn({
        name: 'user',
        type: 'int'
      })
    );

    await queryRunner.createForeignKey(
      'book',
      new TableForeignKey({
        columnNames: ['book'],
        referencedColumnNames: ['id'],
        referencedTableName: 'book',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('book-copie');
  }
}
