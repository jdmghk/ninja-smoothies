const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const salt = process.env.SALT_SECRET;

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check if json web token exists & is valid
    if(token) {
        jwt.verify(token, salt, (error, decodedToken) => {
            if(error) {
                console.log(error.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken)
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
}


//check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, salt, async (error, decodedToken) => {
            if(error) {
                console.log(error.message);
                res.locals.user = null; 
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else{
        res.locals.user = null;
        next();

    }
}

module.exports = ({ requireAuth, checkUser });