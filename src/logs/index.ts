import { createLogger, format, transports } from 'winston'

const { combine, timestamp, printf } = format

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

export const setupLogger = () => {
  const logger = createLogger({
    level: 'info',
    format: combine(
      format.colorize(),
      timestamp(),
      myFormat,
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
    ],
  })

  if (process.env.NODE_ENV === 'production') {
    logger.add(new transports.File({ filename: 'src/logs/error.log', level: 'error' }))
    logger.add(new transports.File({ filename: 'src/logs/combined.log' }))
  }
  global.logger = logger
}
