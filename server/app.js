require('dotenv').config();

var fs = require('fs');
var path = require('path');
var express = require('express');
var minifyHTML = require('express-minify-html');
var swig = require('swig');
var compression = require('compression');
var bodyParser = require('body-parser');
var packageJson = require('../package.json');

const PORT = packageJson.config.port || 3000;
var app = express();

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var env = {
  production: process.env.NODE_ENV === 'production',
  inlineCss: Boolean(process.env.INLINE_CSS)
};

if (env.production) {
  Object.assign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(__dirname, '../assets.json')))
  });
  if (env.inlineCss) {
    Object.assign(env, {
      inlineCssSrc: env.assets.main.css.replace(/\/static/, '../../static/dist')
    });
  }
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
app.use('/static', express.static(path.join(__dirname, '../static/resource')));

app.get('/', function (req, res) {
  res.render('index', {env});
});

app.post('/apply', bodyParser.urlencoded({extended: false}), require('./apply'));

app.listen(PORT, function (err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ in your browser.', PORT, PORT);
});
