var fs = require('fs');
var path = require('path');
var express = require('express');
var minifyHTML = require('express-minify-html');
var swig = require('swig');
var compression = require('compression');
var packageJson = require('../package.json');

const PORT = packageJson.config.port || 3000;
var app = express();

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
  app.use(compression());
  app.use(minifyHTML({
    override: true,
    displayErrors: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  }));
} else {
  app.set('view cache', false);
  swig.setDefaults({
    cache: false
  });
}

app.use('/static', express.static(path.join(__dirname, '../static/dist')));

app.get('/', function (req, res) {
  res.render('index', {
    env: env
  });
});

app.listen(PORT, function (err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ in your browser.', PORT, PORT);
});
