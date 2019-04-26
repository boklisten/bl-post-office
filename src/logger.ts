const winston = require('winston');

if (JSON.stringify(winston.transports) === '{}' || !winston.transports) {
  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
      level: 'silly',
    }),
  );
}

export const logger = winston;
