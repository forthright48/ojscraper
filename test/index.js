const express = require('express');
const app = express();
const server = require('http').createServer(app);

const ojscraper

app.set('port', 3000);

/* Basic Routes*/
app.use('/:ojname/:username', function(req, res) {
  const {ojname, username} = req.params;
});


app.use(function(err, req, res) {
  console.error(err.stack);
  res.status(500).send(err);
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
