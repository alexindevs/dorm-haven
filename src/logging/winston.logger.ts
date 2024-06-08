import winston from 'winston';
import 'winston-mongodb';

const environment = process.env.NODE_ENV || 'development';
const dbInstance =
  environment == 'development'
    ? 'mongodb://localhost:27017/panic-alerts-dev'
    : process.env.MONGO_PROD_INSTANCE;

const prodLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYYMMDD HH:mm:ss',
    }),
    winston.format.json(),
    winston.format.printf((info: any) => {
      const { timestamp, level, message, module } = info;
      return JSON.stringify({
        date: timestamp.split(' ')[0],
        time: timestamp.split(' ')[1],
        level,
        module,
        message,
      });
    }),
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: dbInstance,
      level: 'info',
      options: { useUnifiedTopology: true },
      collection: 'logs',
      storeHost: true,
    }),
  ],
});

const devLogger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYYMMDD HH:mm:ss',
    }),
    winston.format.json(),
    winston.format.printf((info: any) => {
      const { timestamp, level, message, module } = info;
      return JSON.stringify({
        date: timestamp.split(' ')[0],
        time: timestamp.split(' ')[1],
        level,
        module,
        message,
      });
    }),
  ),
  transports: [new winston.transports.Console()],
});

const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export default logger;
