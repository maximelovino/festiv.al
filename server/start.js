const mongoose = require('mongoose');
require('dotenv').config({ path: 'keys.env' });

mongoose.connect(process.env.DATABASE, {useMongoClient:true});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
require('./models/Event');
mongoose.connection.on('error', (err) => {
    console.error("There was a problem");
    console.error(err.message);
});

const app = require('./app');
app.set('port', 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → ADDRESS http://localhost:${server.address().port}`);
});