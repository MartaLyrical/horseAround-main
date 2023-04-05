const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const { tryCatch } = require("../utils/tryCatch")

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
router.get('/', tryCatch(
    // #swagger.tags = ['home']
    // #swagger.summary = 'Homepage.'
    /* #swagger.responses[200] = { 
              description: 'Success'
         } */
    /* #swagger.responses[500] = { 
              description: 'Internal Server Error',
              schema: { $ref: "#/definitions/error" }
         } */
    (req, res) => {
        const response = {
            state: req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
        };
        res.json(response);
    }));

router.get('/profile', requiresAuth(), tryCatch((req, res) => {
    // #swagger.tags = ['home']
    // #swagger.summary = 'profile.'
    /* #swagger.responses[200] = { 
              description: 'Success'
         } */
    /* #swagger.responses[401] = { 
             description: 'Unauthorized',
        } */
    /* #swagger.responses[500] = { 
              description: 'Internal Server Error',
              schema: { $ref: "#/definitions/error" }
         } */
    const response = {
        message: `Welcome ${req.oidc.user.name}!`
    };
    res.json(response);
}))

// routes goes here
router.use('/stables', require('./stables'))
router.use('/breeds', require('./breeds'))
router.use('/owners', require('./owners'))
router.use('/diet', require('./diet'))

module.exports = router