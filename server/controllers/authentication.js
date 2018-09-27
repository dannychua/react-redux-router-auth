const jwt = require('jwt-simple');
const User = require('../models/User');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp}, config.secret)
}

exports.signin = function(req, res, next) {
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user )});
}

exports.signup = function(req, res, next) {
    // Extract user inputs
    const email = req.body.email;
    const password = req.body.password;

    // Check for missing email or password inputs
    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide both email and password' })
    }

    // See if a user with the given email exists
    User.findOne({ email: email}, function(err, existingUser) {
        if (err) {
            return next(err)
        }
        
        // If a user with a given email does exist, return an error
        if(existingUser) {
            return res.status(422).send({ error: 'Email is already in use' })
        }

        // If a user with the email does not exist, create new user and respond with JWT token
        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err) {
            if (err) {
                return next(err)
            }

            res.json({ token: tokenForUser(user) });
        });
    });
}