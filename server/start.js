const mongoose = require('mongoose');
require('dotenv').config({ path: 'keys.env' });

const log = require('winston');
// Configure logger settings
log.remove(log.transports.Console);
log.add(log.transports.Console, {
  colorize: true
});
log.level = 'debug';

mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
require('./models/Event');
mongoose.connection.on('error', (err) => {
  log.error("There was a problem");
  log.error(err.message);
  process.exit(1);
});

const app = require('./app');
app.set('port', 3000);
const server = app.listen(app.get('port'), () => {
  log.info(`Express running → ADDRESS http://localhost:${server.address().port}`);
});