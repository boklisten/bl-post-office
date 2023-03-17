const winston = require("winston");

if (JSON.stringify(winston.transports) === "{}" || !winston.transports) {
  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      level: "silly"
    })
  );
}

let logger = winston;

function setLogger(newLogger: any) {
  logger = newLogger;
}

export { logger, setLogger };
