# alpine-ghost-s3

**USE AT YOUR OWN RISK!** This is just a proof of concept.

This container is a simple example of how to deploy ghost using S3 as the storage backend and PostgreSQL as the database. Benefits:

1. S3 for file storage, no need to worry about having images stored in a container.
2. Database is an outside service configured by environment variables, making this more portable.
3. Built with Alpine Linux making this image about half the size of the community ghost image.

### Building
Clone the repo and build it using Docker:

```
git clone git@github.com:brint/alpine-ghost-s3.git
cd alpine-ghost-s3
docker build -t alpine-ghost-s3 .
```

### Running
Copy `docker.env.example` to `docker.env` and put in your values. Look at `config.js` to see what you can set via environment variable:

```
docker run --name ghost --env-file ./docker.env  -p 8080:2368 -it alpine-ghost-s3
```

Assuming all of your resources such as PostgreSQL and S3 are setup properly with the proper permissions, the output may look something like this:

```
$ docker run --name ghost --env-file ./docker.env  -p 8080:2368 -it alpine-ghost-s3

> ghost@0.8.0 start /
> node index

Migrations: Database initialisation required for version 004
Migrations: Creating tables...
Migrations: Creating table: posts
Migrations: Creating table: users
Migrations: Creating table: roles
Migrations: Creating table: roles_users
Migrations: Creating table: permissions
Migrations: Creating table: permissions_users
Migrations: Creating table: permissions_roles
Migrations: Creating table: permissions_apps
Migrations: Creating table: settings
Migrations: Creating table: tags
Migrations: Creating table: posts_tags
Migrations: Creating table: apps
Migrations: Creating table: app_settings
Migrations: Creating table: app_fields
Migrations: Creating table: clients
Migrations: Creating table: client_trusted_domains
Migrations: Creating table: accesstokens
Migrations: Creating table: refreshtokens
Migrations: Running fixture populations
Migrations: Creating owner
Migrations: Ensuring default settings
Ghost is running in production...
Your blog is now available on http://myblog.org
Ctrl+C to shut down
```

Now that the blog is up, you can access it at http://localhost:8080.

### Troubleshooting
Use the `-it` flags when launching the container to see the errors.

#### Database
If the database isn't properly configured (firewall rules, etc), the container will not start. Here's an example error:

```
$ docker run --name some-ghost --env-file ./docker.env  -p 8080:2368 -it alpine-ghost-s3

> ghost@0.8.0 start /
> node index

Knex:warning - Pool2 - Error: Pool was destroyed
Knex:Error Pool2 - Error: connect ECONNREFUSED 127.0.0.1:5432
Knex:Error Pool2 - Error: connect ECONNREFUSED 127.0.0.1:5432

ERROR: There is a problem with the database
 Pool was destroyed
```

#### S3
If you don't have the credentials, roles, or policies setup properly with S3, your error may look something like this:

```
172.17.0.1 - - [07/May/2016:14:21:15 +0000] "GET /ghost/api/v0.1/settings/?type=blog%2Ctheme%2Cprivate HTTP/1.1" 200 - "http://localhost:8080/ghost/settings/navigation/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"
error in ghost-s3 { [AccessDenied: Access Denied]
  message: 'Access Denied',
  code: 'AccessDenied',
  region: null,
  time: Sat May 07 2016 14:21:27 GMT+0000 (UTC),
  requestId: 'BC3426EEF0DFA30E',
  extendedRequestId: '1esG8QbYKlm7xKXDx89XtwwFwCZf2Ol2srh5oDVOiR38JfHkw2O7J/5KAx7mPJ+ssmVI9GztzA4=',
  cfId: undefined,
  statusCode: 403,
  retryable: false,
  retryDelay: 26.93648540880531 }
```

#### Mail
If you're using SES, and you haven't properly setup your from email address, it will be rejected with an error message like the following:
```
ERROR: DeliveryError: Message delivery failed: 554 Message rejected: Email address is not verified.
```
