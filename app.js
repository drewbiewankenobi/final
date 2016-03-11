// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
// Create Express App Object \\
var app = express();
mongoose.connect('mongodb://localhost/mangoDB')

var Score = mongoose.model( "Score", {
	myScore: {type: Number},	
})

// express session \\

var session = require('express-session')
app.sessionMiddleware = session({
  secret: 'get funky',
  resave: false,
  saveUninitialized: true,
})
app.use(app.sessionMiddleware)

// user DB \\

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
var User = mongoose.model('user', userSchema);

// Application Configuration \\
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// configure passport \\

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//validate user login\\

var bcrypt = require('bcryptjs')
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);
            }
            // If we got this far, then we know that the user exists. But did they put in the right password?
            bcrypt.compare(password, user.password, function(error, response){
                if (response === true){
                    return done(null,user)
                }
                else {
                    return done(null, false)
                }
            })
        });
    }
));

app.isAuthenticated = function(req, res, next){
    // If the current user is logged in...
    if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue.
        return next();
    }
    // If not, redirect to login
    console.log('create an account')
    res.redirect('/');
}


// signup \\
app.post('/signup', function(req, res){
    bcrypt.genSalt(11, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
            var newUser = new User({
                username: req.body.username,
                password: hash,
            });
            newUser.save(function(saveErr, user){
                if ( saveErr ) { res.send({ err:saveErr }) }
                else {
                    req.login(user, function(loginErr){
                        if ( loginErr ) { res.send({ err:loginErr }) }
                        else { res.send({success: 'success'}) }
                    })
                }
            })

        })
    })
})

// login \\

app.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({error : 'something went wrong :('}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({success:'success'});
        });
    })(req, res, next);
})



// Routes \\
app.get('/', function(req, res){
  res.sendFile('splash.html', {root: './public/HTML/'})
});

app.get('/register', function(req, res){
  res.sendFile('login.html', {root: './public/HTML/'})
});

app.get('/games', app.isAuthenticated, function(req, res){
    res.sendFile('/games.html', {root: './hidden'})
})

// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})