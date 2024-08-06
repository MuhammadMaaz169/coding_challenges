// process.loadEnvFile();
import 'dotenv/config'


export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3002,
  apiVersion: process.env.API_VERSION || 'v1',
  passwordEncryption: process.env.PASSWORD_ENCRYPTION_KEY || 'v1',

  jwt: {
    accessTokenExpirationInSeconds:
      Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_IN_SECONDS) || 3600000,
    refreshTokenExpirationInSeconds:
      Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_IN_SECONDS) || 7200000,
  },

  secrets: {
    passwordEncryption: process.env.PASSWORD_ENCRYPTION_KEY || 'abc'
  },

  cors: {
    origin: process.env.ORIGIN || '*',
    credentials: process.env.CREDENTIALS || 'true',
  },

  db: {
    mysql: {
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECTING_STRING,
      schemaName: process.env.ORACLE_SCHEMA_NAME ,
      maxReconnectCount: Number(process.env.ORACLE_MAX_RECONNECT_COUNT) || 1,
      retryInterval: Number(process.env.ORACLE_RETRY_INTERVAL) || 1, // seconds
      maxRows: Number(process.env.ORACLE_MAX_ROWS) || 10000,
      poolMax: Number(process.env.ORACLE_POOL_MAX) || 44,
      poolMin: Number(process.env.ORACLE_POOL_MIN) || 2,
      poolIncrement: Number(process.env.ORACLE_POOL_INCREMENT) || 5,
      events: Boolean(process.env.ORACLE_EVENTS) || true,
      poolTimeout: Number(process.env.ORACLE_POOL_TIMEOUT) || 60,
    },
  },
};
