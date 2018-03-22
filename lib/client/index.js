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

/**
 * Client
 */
class Client {
    /**
     * Constructor
     * 
     * @param {String} user email address for your IMAP settings - set in ./lib/config/settings.js
     * @param {String} password the password for the email address - set in ./lib/config/settings.js 
     * @param {String} host your email providers IMAP host - set in ./lib/config/settings.js
     * @param {Integer} port the port that is hosting the IMAP server - set in ./lib/config/settings.js
     * @param {Boolean} tls security setting (dont touch unless you know what your doing) - set in ./lib/config/settings.js
     * @param {Boolean} proxy enables proxies or disables if you want to run on your local ip - set in ./lib/config/settings.js
     * @param {String} accountPassword the password for the accounts - set in ./lib/config/settings.js
     */
    constructor(config) {
        this.user = config.user;
        this.password = config.password;
        this.host = config.host;
        this.port = config.port;
        this.tls = config.tls;
        this.emails = [];

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
        this.connect();
    }; 
    /**
     * Fetch Emails
     * Scraps the locked account emails and stores them in the array so we can call another function to request new passwords for them
     */
    async fetch() {
        try {
            // Create a new IMAP class with the details provided
            const imap = new Imap({
                user: this.user,
                password: this.password,
                host: this.host,
                port: this.port,
                tls: this.tls
            });

            // 
        } catch(err) {
            logger.red(`Unable to connect to IMAP servers. Error: ${err}`);
            process.exit();
        };
    };
    /**
     * Connect
     * tests the connection with IMAP to see if the user setup this properly
     */
    async connect() {
        // Create a new IMAP class with the details provided
        const imap = new Imap({
            user: this.user,
            password: this.password,
            host: this.host,
            port: this.port,
            tls: this.tls
        });

        function openInbox(cb) {
            imap.openBox('unlocker', true, cb);
        }

        imap.once('ready', function() {
            openInbox(function(err, box) {
                if (err) throw err;
                var f = imap.seq.fetch('1:3', {
                  bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
                  struct: true
                });
                f.on('message', function(msg, seqno) {
                  console.log('Message #%d', seqno);
                  var prefix = '(#' + seqno + ') ';
                  msg.on('body', function(stream, info) {
                    var buffer = '';
                    stream.on('data', function(chunk) {
                      buffer += chunk.toString('utf8');
                    });
                    stream.once('end', function() {
                      console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
                    });
                  });
                  msg.once('attributes', function(attrs) {
                    console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                  });
                  msg.once('end', function() {
                    console.log(prefix + 'Finished');
                  });
                });
                f.once('error', function(err) {
                  console.log('Fetch error: ' + err);
                });
                f.once('end', function() {
                  console.log('Done fetching all messages!');
                  imap.end();
                });
              });
          });
          
          imap.once('error', function(err) {
            console.log(err);
          });
          
          imap.once('end', function() {
            console.log('Connection ended');
          });
          
          imap.connect();
    };
};

module.exports = Client;