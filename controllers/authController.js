const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const salt = process.env.SALT_SECRET;
// handle errors
const handleErrors = (error) => {
    console.log(error.message, error.code);
    let errs = { email: '', password: ''};

//incorrect email
if (error.message === 'incorrect email'){
    errs.email = 'that email is incorrect';
    return errs;
}

//incorrect password
if (error.message === 'incorrect password'){
    errs.password = 'that password is not registered';
    return errs;
}

// duplicate error code
if (error.code === 11000) {
    errs.email = 'that email is already registered';
    return errs;
}

    // validation errors
    if(error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({properties}) => {
            errs[properties.path] = properties.message;
        })
    }

    return errs;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, salt, {
        expiresIn: maxAge
    });
}


module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(201).json({ user: user._id });
    } 
    catch (error) {
        const errs = handleErrors(error);
        return res.status(400).json({ errs });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        res.status(200).json({ user: user._id });
        res.cookie('jwt',token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id })
    } 
    catch (error) {
        const errs = handleErrors(error);
        res.status(400).json({ errs });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
}