// # Client
// handles the entire password reset bot for nike

// defines that javascript should be executed in 'strict mode' (ECMAScript 5)
'use strict';

// import dependencies
const logger = require('../logger')('client');
const Promise = require('bluebird');
const rp = require('request-promise');
const Imap = require('imap');
const inspect = require('util').inspect;
const moment = require('moment');
const cheerio = require('cheerio');
const Nightmare = require('nightmare')

// shhh
const nightmare = Nightmare({ show: false })

/**
 * Client
 */
class Client {
    /**
     * Constructor
     * 
     * @param {Integer} mode sets the mode for the bot - set in ./lib/config/settings.js
     * @param {Integer} delay sets the retry interval for the bot if something goes wrong - set in ./lib/config/settings.js
     * @param {String} user email address for your IMAP settings - set in ./lib/config/settings.js
     * @param {String} password the password for the email address - set in ./lib/config/settings.js 
     * @param {String} host your email providers IMAP host - set in ./lib/config/settings.js
     * @param {Integer} port the port that is hosting the IMAP server - set in ./lib/config/settings.js
     * @param {Boolean} tls security setting (dont touch unless you know what your doing) - set in ./lib/config/settings.js
     * @param {Boolean} proxy enables proxies or disables if you want to run on your local ip - set in ./lib/config/settings.js
     * @param {String} accountPassword the password for the accounts - set in ./lib/config/settings.js
     * @param {String} mailbox the mailbox that is holding the locked emails - set in ./lib/config/settings.js
     */
    constructor(config) {
        this.mode = config.mode;
        this.delay = config.delay;
        this.user = config.user;
        this.password = config.password;
        this.host = config.host;
        this.port = config.port;
        this.tls = config.tls;
        this.proxy = config.proxy;
        this.accountPassword = config.accountPassword;
        this.mailbox = config.mailbox;
        this.emails = [];
        this.passwordResets = [];

        // Validate that the password passes the regex test
        let validator = /[A-Z][a-zA-Z].*\d{2,}$/
        let result = validator.test(config.accountPassword);

        if(result) {
            this.accountPassword = config.accountPassword;
        } else {
            this.accountPassword = 'Kickmoji12';
        };
    };
    /**
     * Init
     * initializes the client to start the process of resetting password
     */
    async init() {
        this.fetch();
    }; 
    /**
     * Fetch Emails
     * scraps the locked account emails and stores them in the array so we can call another function to request new passwords for them
     */
    async fetch() {
        try {
            // create a place holder for the emails
            let emails = [];
            let tokens = [];

            // create a new IMAP class with the details provided
            const imap = new Imap({
                user: this.user,
                password: this.password,
                host: this.host,
                port: this.port,
                tls: this.tls
            });

            // create the connection to the IMAP box and set the mailbox to whatever you defined in the config
            imap.once('ready', () => {
                imap.openBox(this.mailbox, true, (err, box) => {
                    // if theres a error or the mailbox is invalid
                    if(err || !box) {
                        logger.red(`Unable to open ${this.mailbox} - err: ${err}`);
                        process.exit();
                    };

                    // create the scraper for the mailbox
                    let scraper = imap.seq.fetch('1:5000', {
                        bodies: 'HEADER.FIELDS (TO)',
                        struct: true
                    });

                    // on each message it finds
                    scraper.on('message', (account, seqno) => {
                        // create a start timer 
                        let start = moment.now();

                        // loop through each message and add the email to an array to hold them for later
                        account.on('body', (stream, info) => {
                            let buffer = '';

                            // convert the data to utf8 encoded strings so we can manipulate it later
                            stream.on('data', (chunk) => {
                                buffer += chunk.toString('utf8');
                            });

                            // once the data is sent, we will maniupulate the string and add the email to our array
                            stream.on('end', () => {
                                // parse the email address that got sent the email and maniupulate it
                                let emailAddress = Imap.parseHeader(buffer);
                                emailAddress = String(JSON.stringify(emailAddress.to)).replace('["', '').replace('"]', '');

                                // append the email address to the locked emails array
                                emails.push(emailAddress);
            
                                logger.green(`Added ${emailAddress} to the locked accounts array`);
                                process.exit();
                            });
                        });
                        
                        // Once all the messages  get added into the array, we call another function to send requests to unlock them
                        account.once('end', () => {
                            // set the emails to this.emails
                            this.emails = emails;

                            logger.green(`Finished adding all the locked emails! Loaded ${this.emails.length} accounts!`);
                            imap.end();
                        });

                        // if an error occurs
                        account.once('error', (err) => {
                            logger.red(`Unable to scrap emails. err: ${err}`);
                            process.exit();
                        });
                    });
                });
            });

            // incase an error occurs
            imap.once('error', (err) => {
                logger.red(`Unable to connect to IMAP servers. Error: ${err}`);
                process.exit();
            });

            // once the script fetches all the emails
            imap.once('end', () => {
                // check the mode and depending on that call a seperate function
                if(this.mode === 0) {
                    this.requestReset();
                };
            });

            // connect to the IMAP server
            imap.connect();
        } catch(err) {
            logger.red(`Unable to connect to IMAP servers. Error: ${err}`);
            process.exit();
        };
    };
    /**
     * RequestReset
     * requests a password token from nikes servers
     */
    async requestReset() {
        try {
            // loop through each email now because we need a unique client id for each account
            this.emails.forEach((email) => {
                // sadly we have to use nightmare because nike will block our login / forgot password endpoints
                nightmare
                    .goto('https://s3.nikecdn.com/unite/updatePassword.html?view=resetPassword&backendEnvironment=identity&locale=en_GB')
                    .wait('input[type="email"]')
                    .type('input[type="email"]', email)
                    .click('input[value="RESET"]')
                    .wait('input[value="BACK TO LOGIN"]')
                    .end()
                    .then(() => {
                        logger.green(`${email} successfully requested a token! Check your email!`);
                    })
                    .catch(err => {
                        logger.red(err);
                    })                
            });
        } catch(err) {
            logger.red(`Something went wrong! Retrying in ${this.delay}`)

            setTimeout(() => this.requestReset(), this.delay);
        };
    };
};

module.exports = Client;