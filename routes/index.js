const express = require('express');
const { auth } = require('express-openid-connect');

const router = express.Router()
// router.use("/", require("./swagger"));

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

// For OAuth authentication
router.use(auth(config));

// for testing only
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// routes goes here
router.use('/stables', require('./stables'))
router.use('/breeds', require('./breeds'))
router.use('/owners', require('./owners'))
router.use('/diet', require('./diet'))

module.exports = router