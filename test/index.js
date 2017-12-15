const express = require('express');
const app = express();
const server = require('http').createServer(app);

const ojscraper = require('../index');

app.set('port', 3001);

/* Basic Routes */
app.get('/userinfo/:ojname/:username', function(req, res, next) {
  const { ojname, username } = req.params;
  const subojname = req.query.suboj;

  ojscraper.getUserInfo({ojname, username, subojname})
    .then(function(stats) {
      return res.send(stats);
    })
    .catch(next);
});

app.get('/probleminfo/:ojname/:problemID', function(req, res, next) {
  const { ojname, problemID } = req.params;

  ojscraper.getProblemInfo({ojname, problemID})
    .then(function(stats) {
      return res.send(stats);
    })
    .catch(next);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.get('*', function(req, res) {
  return res.status(404).send('Page not found\n');
});

if (require.main === module) {
  server.listen(app.get('port'), function() {
    console.log(`Server running at port ${app.get('port')}`);
  });
} else {
  module.exports = {
    server,
    app,
  };
}
