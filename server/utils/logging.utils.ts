import winston from 'winston'
import { LoggingWinston } from '@google-cloud/logging-winston'
import { Environment, isEnvironment } from './environment.utils'

const logger = winston.createLogger({
	exitOnError: false,
})

if (isEnvironment(Environment.Production)) {
	logger.add(new LoggingWinston())
	logger.level = 'info'
} else {
	logger.level = 'debug'
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.simple(),
				winston.format.errors({ stack: true })
			),
		})
	)
}

export default logger
