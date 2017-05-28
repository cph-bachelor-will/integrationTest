var util = require('util');

module.exports = function (app, db) {

	app.get('/', function (req, res, next) {
		res.render('index');
	}); 

	app.get('/secure', function (req, res, next) {
		res.render('secure');
	});

	app.get('/login', function (req, res, next) {
		res.render('login', { flash: req.flash() } );
	});

	app.post('/login', function (req, res, next) {
		var username = req.body.username;
		var password = req.body.password;
		db.collection('users').findOne({ username: username, password: password}, (err, user) => {
			if (err) { console.log("error", err); }
		  	if (user) {
				req.session.authenticated = true;
				res.redirect('/secure');
			} else {
				res.status(401).redirect('/login');
			}
		});

	});

	app.get('/logout', function (req, res, next) {
		delete req.session.authenticated;
		res.redirect('/');
	});

};
