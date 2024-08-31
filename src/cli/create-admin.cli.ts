import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserRoleEnum } from '../modules/user/domain/enums/user-role.enum';
import { UserCreateQueryBuilder } from '../modules/user/infrastructure/database/query-builders/user-create.query-builder';

async function createAdmin(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'],
  });
  const userCreateQueryBuilder = app.get(UserCreateQueryBuilder);
  const params: { [key: string]: any } = {};
  process.argv.slice(2).forEach((param) => {
    const [key, val] = param.split('=');
    if (key && val) params[key] = val;
  });
  console.log({ params });
  const { email, password, login } = params;
  if (!email) throw new Error('no email!');
  else if (!password) throw new Error('no password!');
  else if (!login) throw new Error('no login!');
  userCreateQueryBuilder
    .runCreate({
      role: UserRoleEnum.admin,
      login: params.login,
      email: params.email || null,
      password: params.password || null,
    })
    .then(() => {
      process.exit(0);
    });
}

createAdmin();
