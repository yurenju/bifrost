var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');

var app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
app.dataSource('storage', {
  connector: require('loopback-component-storage'),
  provider: 'filesystem',
  root: path.join(__dirname, '..', 'upload')
});

boot(app, __dirname);


app.use(loopback.static(path.resolve(__dirname, '../landing')));
app.use('/app', loopback.static(path.resolve(__dirname, '../client')));


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
