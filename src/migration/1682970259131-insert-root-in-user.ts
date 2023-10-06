import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertRootInUser1682970259131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      INSERT INTO public."user"(name, email, cpf, type_user, phone, password)
      VALUES ('root', 'root@root.com', '0', 2, '0', '$2b$10$GQPRvJPkCcdI8bssKDfmZOnelpCBf8qn863Ti0p8M5jrhIrBxEZZG');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      DELETE FROM public."user"
      WHERE email like 'root@root.com';
    `);
  }
}
