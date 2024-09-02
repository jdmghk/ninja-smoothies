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

module.exports = ({ requireAuth });