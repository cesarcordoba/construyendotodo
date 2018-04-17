var db = require('../relations');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var localStrategy = require('passport-local').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var config = require('../../conf/oauth.js');
var usuario = db.usuario;
var secret  = 'ScarlettJohanson';

var ex = module.exports = {};

ex.prueba = function(req, res, next) {

    var data = req.body;
    console.log(data);

    res.status(200).jsonp(data);

};



passport.serializeUser(function(user, done) {

    var serializeData = {
        userId: user.id,
        username: user.nombre,
        email: user.correo
    };

    done(null, serializeData);

});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

ex.create = function(req, res, next) {

    // res.send({message: 'Esto es un mensaje'});

    // var data = req.body;
    //
    // console.log(data);
    // usuario.create(data).then(function() {
    //     res.status(200).jsonp(req.body);
    // });

};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        usuario.findById(id).then(function(usuario) {
            res.status(200).jsonp(usuario);
        });
    } else {
        usuario.findAll().then(function(usuarios) {
            res.status(200).jsonp(usuarios);
        });
    }
};

ex.token = function(req, res, next){

    var token = req.params.token;

    jwt.verify(token, secret, function(err, decoded){
        if(err){
            res.json({success : false, message: 'token invalid'})
        }else{
            res.json(decoded)
        }
    });

}

ex.login = function(req, res, next) {

    var data = req.body;
    console.log(req.body);


    passport.authenticate('login', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({success: false, message: 'Incorrect username or password.'});
        }

        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            var token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
            return res.send({success: true, message: 'Authentication succeeded', token: token});
        });
    })(req, res, next);

};

ex.registro = function(req, res, next) {

    var data = req.body;

    console.log(data);

    passport.authenticate('registro', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({success: false, message: info});
        }
        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.send({success: true, message: 'Registration succeeded', user: user});
        });
    })(req, res, next);

};

ex.facebook = function(req, res, next) {
    passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
}

ex.facebookcallback = function(req, res, next) {
  passport.authenticate('facebook',{
        successRedirect: '/token',
        failureRedirect : '/'
    })(req, res, next);
}

passport.use('login', new localStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {
    usuario.findOne({
        where: {
            'correo': username
        }
    }).then(user => {
        if (!user) {
            return done(null, false)
        }
        if (password == user.password) {
            return done(null, user)
        }
        return done(null, false)
    })
}))

passport.use('registro', new localStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {

    usuario.find({
        where: {
            'correo': username
        }
    }).then(user => {

        if (user) {
            return done(null, false);
        } else {
            var data = req.body;
            usuario.create(data).then(user => {
                return done(null, user);
            });
        }

    }, function(err) {
        done(err, null);
    });
}));


passport.use('facebook', new facebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
        'id',
        'emails',
        'displayName',
        'picture',
        'cover',
        'first_name',
        'last_name',
        'locale',
        'gender',
        'hometown'
    ]
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        console.log(profile);
        usuario.find({
            where: {
                'fb_id': profile.id
            }
        })
        .then(function(user) {
            if (user) {
                done(null, user);
            } else {

                var nombre = profile.displayName;
                var correo = profile.displayName;

                if (profile.name.givenName != undefined) {
                    nombre = profile.name.givenName;
                }
                if (profile.emails != undefined) {
                    if (profile.emails.length > 0) {
                        correo = profile.emails[0].value;
                    }
                }

                var nuevousuario = {
                    nombre: nombre,
                    correo: correo,
                    fb_id:  profile.id,
                }

                usuario.create(nuevousuario).then(function(user) {

                    return done(null, user);

                }, function(err) {
                    throw err;
                });
            }
        }, function(err) {
            return done(err);
        });
    });
}));
