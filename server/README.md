# Festiv.al - REST server component

## How to run it?

To run the server, you have to install the dependencies first by doing:

```
npm install
```

Then you can run the server using nodemon by using our start script:

```
npm start
```

Or if you have the `forever` module on your machine, you can run it by using:

```
forever start start.js
```

To build the API doc of our server, you can run:

```
npm run doc
```

The server will listen on port 3000.

### Environment variables

To run the server, you need to have a `keys.env` in the root folder of the server component containing the APIs' keys and database connection information. This file will be of the form:

```
SPOTIFY_ID=<Your spotify ID>
SPOTIFY_SECRET=<Your spotify secret>
EVENTFUL=<Your eventful API key>
DATABASE=mongodb://<user>:<password>@<IP>:<PORT>/<DB_NAME>
```