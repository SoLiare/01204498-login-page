var LocalStrategy = require("passport-local").Strategy;
var knex = require('../database/knex.js');
var sha256 = require('sha256');
var options = {
    usernameField: "username",
    passwordField: "password"
};

module.exports = function(passport) {
    passport.use(
        new LocalStrategy(options, (username, password, done) => {
            knex('user').where('username', username).then(user => {
                if (user.length == 0) return done(null, false);
                var salt = user[0].password.slice(0, 32);
                var pwd = password+salt;
                var hashed = sha256(pwd);
                if(user[0].password == salt+hashed) {
                    return done(null, user[0]);
                }
                return done(null, false);
            })
            .catch(err => {
                return done(err);
            });
        })
    );
};