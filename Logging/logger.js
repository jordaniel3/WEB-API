const { createLogger, format, transports, config } = require('winston');
 
const logger = createLogger({
   format: format.combine(format.timestamp(), format.json()),
   transports: [
       new transports.Console(),
       new transports.File({ filename: '../Logs/logs.log' })
     ]
 });
 module.exports = logger;