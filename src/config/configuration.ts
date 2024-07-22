export default () => ({
  nodeEnv: process.env.NODE_ENV,
  db: {
    username: process.env.COMPOSE_DB_USER || process.env.DB_USER,
    password: process.env.COMPOSE_DB_PASSWORD || process.env.DB_PASSWORD,
    host: process.env.COMPOSE_DB_HOST || process.env.DB_HOST,
    port: process.env.COMPOSE_DB_PORT || process.env.DB_PORT,
    name: process.env.COMPOSE_DB_NAME || process.env.DB_NAME,
  },
  session: {
    secret: process.env.S_SECRET || 'secret',
    maxAge: +process.env.S_MAX_AGE || 1000 * 60 * 60 * 24 * 3,
  },
  redis: {
    port: +process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },
  app: {
    port: +process.env.PORT,
    apiUrl: process.env.APP_URL_API,
    clientUrl: process.env.APP_URL_CLIENT,
  },
});
