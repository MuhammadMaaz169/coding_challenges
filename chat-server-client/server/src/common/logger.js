class CustomLogger {
    static logger;
    getLogger() { return this.logger }
    setLogger(logger) { this.logger = logger }
}

console.log('creating custom logger');
export const customLogger = new CustomLogger();



