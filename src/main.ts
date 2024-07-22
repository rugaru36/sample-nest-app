import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import configuration from './config/configuration';
import {
  getErrorMessagesFromParsedValidationError,
  parseValidationError,
} from './common/helpers/parse-validation-error.helper';
import * as createRedisStore from 'connect-redis';
import { createClient } from 'redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const parsedErrors = validationErrors.map((error) => {
          const parsed = parseValidationError(error);
          const errorMessages =
            getErrorMessagesFromParsedValidationError(parsed);
          errorMessages.forEach((msg) => {
            Logger.error(msg, error.target.constructor.name);
          });
          return parsed;
        });
        return new BadRequestException(new BadRequestException().message, {
          description: JSON.stringify(parsedErrors),
        });
      },
    }),
  );
  app.enableCors({
    origin: configuration().app.clientUrl,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
  });

  const RedisStore = createRedisStore(session);
  const redisClient = createClient(configuration().redis);
  redisClient.on('error', (e) => {
    Logger.error('Could not establish a connection with redis. ' + e);
  });
  redisClient.on('connect', () => {
    Logger.verbose('Connected to redis successfully', 'Bootstrap');
  });

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'supersecretkey',
      resave: true,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        sameSite: 'strict',
        httpOnly: false,
        maxAge: configuration().session.maxAge,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Sample nest app')
    .setDescription('Scalebay API documentation')
    .setVersion('1.0')
    // .addTag('scalebay')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  const port = configService.get('app.port');
  try {
    await app.listen(port);
    Logger.verbose(
      `listening to ${port}. node_env: ${process.env.NODE_ENV}`,
      'NestJS',
    );
    Logger.verbose(`CORS ORIGIN: ${configuration().app.clientUrl}`, 'NestJS');
  } catch (e) {
    Logger.error(e.message);
  }
}
bootstrap();
