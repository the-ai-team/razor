import { createLogger, format, Logger, transports } from 'winston';
import { LogLevels, logLevels } from './levels';

const { combine, errors, printf } = format;

// Google Cloud Severity Levels
const severityMap: Map<string, string> = new Map([
  [LogLevels.Error, 'ERROR'],
  [LogLevels.Warn, 'WARNING'],
  [LogLevels.Info, 'INFO'],
  [LogLevels.Debug, 'DEBUG'],
]);

const logFormat = printf(({ service, subject, level, message, ...args }) => {
  const log = {
    service,
    subject,
    severity: severityMap.get(level),
    message,
    context: {},
  };
  if (Object.keys(args).length) {
    log.context = args;
  }
  return JSON.stringify(log);
});

export const cloudLogger = (): Logger => {
  return createLogger({
    level: 'debug',
    levels: logLevels,
    format: combine(errors({ stack: true }), logFormat),
    defaultMeta: { service: 'server-logs' },
    transports: [new transports.Console()],
  });
};
