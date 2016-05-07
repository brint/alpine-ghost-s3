// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: process.env.SITE_URL || 'http://my-ghost-blog.com',
        mail: {
            from: process.env.MAIL_FROM || 'no-reply@my-ghost-blog.com',
            transport: 'SMTP',
            options: {
                host: process.env.SMTP_HOST || 'YOUR-SES-SERVER-NAME',
                port: process.env.SMTP_PORT || 465,
                service: 'SES',
                auth: {
                    user: process.env.SMTP_USER || 'YOUR-SES-ACCESS-KEY-ID',
                    pass: process.env.SMTP_PASS || 'YOUR-SES-SECRET-ACCESS-KEY'
                }
            }
        },
        database: {
            client: 'postgres',
            connection: {
                host: process.env.PG_HOST || 'database address',
                user: process.env.PG_USER || 'username',
                password: process.env.PG_PASS || 'password',
                database: process.env.PG_DB || 'databasename',
                port: process.env.PG_PORT || '5432'
            },
        },
        storage: {
            active: 'ghost-s3',
            'ghost-s3': {
                accessKeyId: process.env.S3_KEYID || 'derpaderp',
                secretAccessKey: process.env.S3_ACCESSKEY || 'derpaderp',
                bucket: process.env.S3_BUCKET || 'ghostbucket',
                region: process.env.S3_REGION || 'us-east-1'
            }
        },
        server: {
            host: process.env.SITE_HOST || '0.0.0.0',
            port: process.env.SITE_PORT || '2368'
        }
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blog's published URL.
        url: 'http://localhost:2368',

        // Example mail config
        // Visit http://support.ghost.org/mail for instructions
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        // #### Database
        // Ghost supports sqlite3 (default), MySQL & PostgreSQL
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        // #### Server
        // Can be host & port (default), or socket
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    }
};

module.exports = config;
