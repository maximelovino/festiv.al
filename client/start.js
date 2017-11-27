const app = require('./app');
app.set('port', 80);
const server = app.listen(app.get('port'), () => {
  console.log(`Express client running → ADDRESS http://localhost:${server.address().port}`);
});