var express = require('express');
var swig = require('swig');
var app = express();
var path = require('path');
var compress = require('compression');
var fs = require('fs');

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var env = {
  production: process.env.NODE_ENV === 'production'
};

if (env.production) {
  Object.assign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(__dirname, '../assets.json')))
  });
} else {
  app.set('view cache', false);
  swig.setDefaults({ cache: false });
}

app.use(compress());
app.use('/static', express.static(path.join(__dirname, '../static/dist')));

app.get('/', function (req, res) {
  res.render('index', {
    env: env
  });
});

app.listen(3005, function () {
  console.log('Listening on port 3005!');
});
