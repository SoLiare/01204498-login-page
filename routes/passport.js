var knex = require('../database/knex.js');

module.exports = function(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.username);
    });
    passport.deserializeUser((username, done) => {
        knex('user').where('username', username).then(user => {
            done(null, user[0]);
        })
        .catch(err => {
            done(err, null);
        });
    });
};