
// process terminator
const terminate = (level, message, app, db) => { 
    payload = {
        date    : new Date(new Date().toUTCString()),
        level,
        message : message.message ? message.message : message,
        trace   : message.stack   ? message.stack.replace(/    /g, ``).split(`\n`) : []
    }

    if (db) {
        db.end();
    }

     if (app) {
        app.close();
    } 

    console.error(payload);
    process.exit(1);
}

// process handler
const process_handler = (app, db) => {
    process.on('warning', (warning) => { 
        terminate(`warn`, warning, app, db);
    });

    process.on('uncaughtException', (error) => {
        terminate(`fatal`, error, app, db);
    });

    process.on('unhandledRejection', (error) => {
        terminate(`fatal`, error, app, db);
    });

    process.on('SIGTERM', () => {
        terminate(`info`, `${process.env.APP_NAME} PID: ${process.pid} terminated`, app, db);
    });

    process.on('SIGHUP', () => {
        terminate(`info`, `${process.env.APP_NAME} PID: ${process.pid} hanged up`, app, db);
    });

    process.on('SIGINT', () => {
        terminate(`info`, `${process.env.APP_NAME} PID: ${process.pid} interrupted`, app, db);
    });

    process.on('terminate', () => {
        terminate(`info`, `${process.env.APP_NAME} with PID: ${process.pid} has been manually shutdown.`, app, db);
    });
}

module.exports = {
    process_handler
}