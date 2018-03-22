const settings = {
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
        user: "vladisgoat@gmail.com",
        password: "SoonToCome",
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        mailbox: 'unlocker'
    },
    /**
     * Proxy
     * enable proxy services for the password resets by changing this value
     * 
     * @param {Boolean} proxy false
     */
    proxy: false,
    /**
     * Password
     * sets the new password that hte user wants for all their accounts
     * if the password does not meet nikes requirements, a random one will be generated
     * 
     * @param {String} password Kickmoji01
     */
    password: "VladCooks69"
};
module.exports = settings;
