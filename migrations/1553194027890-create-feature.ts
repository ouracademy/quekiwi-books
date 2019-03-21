import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateFeature1553194027890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'feature',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'type',
            type: 'varchar'
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'book_copy_features_feature',
        columns: [
          {
            name: 'bookCopyId',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'featureId',
            type: 'int',
            isPrimary: true
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'book_copy_features_feature',
      new TableForeignKey({
        columnNames: ['bookCopyId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'book_copy',
        onDelete: 'CASCADE'
      })
    );

    await queryRunner.createForeignKey(
      'book_copy_features_feature',
      new TableForeignKey({
        columnNames: ['featureId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'feature',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('feature');
    await queryRunner.dropTable('book_copy_features_feature');
  }
}
