// var express = require('express');

// var port = 8999;

// var app = express.createServer();

// const MongoClient = require('mongodb').MongoClient;

// var db;

createServer(8999);

function createServer(port) {
  var express = require('express');

  var app = express.createServer();

  const MongoClient = require('mongodb').MongoClient;

  var db;

  var db;

  // MongoClient.connect('mongodb://test:test@ds163060.mlab.com:27017/login', (err, database) => {
  MongoClient.connect('mongodb://localhost:27017/login', (err, database) => {
    if (err) return console.log(err)
    db = database;
    require('./lib/routes.js')(app, db);
  })

  app.configure(function () {

    app.use(express.cookieParser());
    app.use(express.session({ secret: 'example' }));
    app.use(express.bodyParser());
    app.use(checkAuth);
    app.use(app.router);
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });

  });

  return app.listen(port, () => {
    console.log('listening on ' + port);
  })
}

function checkAuth (req, res, next) {

    if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
        res.render('unauthorised', { status: 403 });
        return;
    }

    next();
}

function passwordCheck(str) {
    if (str.length < 6) {
       //too short
       return false
    } else if (str.search(/\d/) == -1) {
       //no number
       return false
    } else if (str.search(/[a-zA-Z]/) == -1) {
        //no letter
       return false
    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
        //bad char
       return false
    }
    return true;
}

module.exports = createServer;
// app.listen(port);
// console.log('Node listening on port %s', port);
