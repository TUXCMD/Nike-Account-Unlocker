const settings = {
    /**
     * Mode
     * depending on the mode, the bot will go through different phases
     * this is because each mailbox has to have different emails in them
     * in order to work with the application
     * 
     * @param {Integer} mode 0 - reset | sends request for the password token
     */
    mode: 0,
    /**
     * Delay
     * this is how long it should wait if something goes wrong
     * for example if nikes endpoint crashes, it will wait X seconds before requesting again
     * 
     * @param {Integer} delay in microseconds
     */
    delay: 5000,
    /**
     * IMAPP
     * Configuration for your email provider. By default, this will be setup to use gmails
     * smtp settings. Check out the README.md if your unsure what your supposed to do to make 
     * email provider compatible. If we do not support it or mention it, do your own research,
     * we will not provide support for this.
     * 
     * @param {String} client_user GMAIL: your email address | Private Email: Your email address
     * @param {String} client_password GMAIL: your password for your account | Private Email: the password for the account
     * @param {String} client_host GMAIL: imap.gmail.com | Private Email: mail.privateemail.com 
     * @param {Integer} client_port GMAIL: 993 | Private Email: 143
     * @param {Boolean} client_tls true (dont change this unless you know what your doing)
     * @param {String} client_mailbox the name of the mailbox that is holding your nike locked accounts
     */
    client: {
        user: "vladscoolaf@gmail.com",
        password: "randompass123",
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        mailbox: 'unlockme'
    },
    /**
     * Password
     * sets the new password that hte user wants for all their accounts
     * if the password does not meet nikes requirements, a random one will be generated
     * 
     * @param {String} password Kickmoji01
     */
    password: "Kickmoji01"
};

module.exports = settings;