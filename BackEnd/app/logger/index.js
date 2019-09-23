const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

// const env = process.env.NODE_ENV || 'development';
// console.log(env);

/**
 * Remember to configure the timezone on the VM that is running the server, otherwise logs recorded will display incorrect date and time
 * Run 'timedatectl' to check timezone on VM
 * Run 'sudo timedatectl set-timezone Asia/Singapore' to configure VM timezone to local timezone
 */

const rotateLogFiles = new transports.DailyRotateFile({
  filename: 'log/results.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  // maxSize: '5g',
  maxFiles: 30 // One new log file created each day, set maxFiles to 30 to keep last 30 files or alternatively, set to '30d' to keep past 30 days worth of log files
});

rotateLogFiles.on('rotate', (oldFilename, newFilename) => {
  console.log(`${new Date()}`);
  console.log(`Old log file will be stored for 30 days: ${oldFilename}`);
  console.log(`New log file created: ${newFilename}`);
});

/**
 * Do not use .colorize() except for logging output to terminal/console
 * Result will be something like this '[32minfo[39m:'
 * These are color code escapes, only useful when logging to a terminal/console to be intepreted to change text color, useless in a log file
 */
const logger = createLogger({
  // change level if in dev environment versus production
  // level: env === 'development' ? 'debug' : 'info', // KIV since production should also log debug level log calls
  level: 'debug',
  // determine level for results.log file
  format: format.combine(
    // format.colorize(), //refer to comment above
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    rotateLogFiles,
    // For logging to terminal/console
    new transports.Console({
      level: 'info', // determine level for console
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    })
  ]
});

module.exports = logger;
