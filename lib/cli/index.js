// # Command Line Interface
// sets up the Command Line Interface

// defines that javascript should be executed in 'strict mode' (ECMAScript 5)
'use strict';

// import dependencies
const logger = require('../logger')('cli');
const config = require('../config');
const client = require('../client');

// # Initialize
// prints a initialize screen to show that the client has started
logger.normal('------------------------');
logger.green('Nike Account Unlocker');
logger.green('Developed by: Vlad');
logger.normal('------------------------');


// # Validation
// validate the config file to make sure it will load once the application starts
try {
    const mode = config.settings.mode;
    const delay = config.settings.delay;
    const user = config.settings.client.user;
    const password = config.settings.client.password;
    const host = config.settings.client.host;
    const port = config.settings.client.port;
    const tls = config.settings.client.tls;
    const proxy = config.settings.proxy;
    const userPass = config.settings.password;
    const mailbox = config.settings.client.mailbox;

    // if its valid
    logger.green('Successfully loaded config');
    logger.normal('------------------------');
} catch(err) {
    logger.red('sorry. the file you specified is not existing or not a valid JSON file.');
    process.exit();
};

// # Start 
// calls the client to run 
let Client = new client({
    mode: config.settings.mode,
    delay: config.settings.delay,
    user: config.settings.client.user,
    password: config.settings.client.password,
    host: config.settings.client.host,
    port: config.settings.client.port,
    tls: config.settings.client.tls,
    proxy: config.settings.proxy,
    accountPassword: config.settings.password,
    mailbox: config.settings.client.mailbox
});

Client.init();