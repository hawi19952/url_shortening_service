
# URL Shortening Service

The URL Shortening Service is a Typescript / MySQL service that helps you generate unique short URL with allow you to get the count of short-URL clicks of all time.

## Prerequisites

This projects depends on a MySQL database with a simple native-password.

### Environment

The project has to modes to run; `production` and `develop`. while `production` expects a `.env` file to exist in the project directory, `develop` expects a `.develop.env` file.
Environment file requires the minimal attributes of:

```.env
PORT=3200
NODE_ENV=development
DB_USER=root
DB_PASS=password
DB_HOST=localhost
DB_PORT=3306
```

> Make sure to change it to match the environment you are deploying into

### Database

1. MySQL database with simple authentication or token as a password.
2. Existing database named `url-shortener`
  1. If you have Docker, it is recommended to use the bash script `start.mysql.sh` to initiate the database engine, the target database and the root user.
  2. Root Password in the default configs: `password`
  3. If you want to reset the database configured through the script, you can use `stop.mysql.sh`

### Schema

1. Schema is being initiated by `npm run db-up`, where the project will connect  to the database and initiate the expected schema using `Kysely`.
2. To reset schema without resetting the database engine, you may use `npm run db-down`.

---

## Installation

1. The project was built with `node: v21.7.3` with `npm: 9.3.1`
2. Use the simple command of `npm i` to install the project dependencies which are:

 ```json

"dependencies": {
 "@types/body-parser": "^1.19.5",
 "@types/express": "^4.17.21",
 "body-parser": "^1.20.2",
 "express": "^4.19.2",
 "kysely": "^0.27.4",
 "mysql2": "^3.11.0",
 "short-unique-id": "^5.2.0"
}

```

3. Build the project using the command `npm run build`
4. Initiate the schema for the first time using `npm run db-up` then exit the terminal session.
5. Start the project on the target environment using:
  1. `npm run develop` for development, targeting the environment file `.develop.env`
  2. `npm run start` for production, targeting the default environment file `.env`

---

## Usage

Available endpoints to communicate with are:

- `GET ${HOST}/shorten/:shortCode` to get redirected to the destination
- `GET ${HOST}/shorten/:shortCode/stats` to get a report of the total access count to the short URL generated
- `POST ${HOST}/shorten/` with JSON body

```json
{ "url": "sampleurl.com" }
```

- `PUT ${HOST}/shorten/:shortCode` with JSON body similar to the `POST` method to update the destination which a URL redirects to.
- `DELETE ${HOST}/shorten/:shortCode` to delete the short URL from the database and stop the redirection using the short-code
