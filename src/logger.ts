import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  defaultMeta: {service: 'bl-post-office'},
  transports: [
    new winston.transports.File({
      filename: 'bl-post-office.error.log',
      level: 'error',
    }),
    new winston.transports.File({filename: 'bl-post-office.combined.log'}),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}
