const CognitoExpress = require('cognito-express')

module.exports = (req, res, next) => {

    const cognitoExpress = new CognitoExpress({
        region: "us-east-2",
        cognitoUserPoolId: process.env.USER_POOL_ID,
        tokenUse: "access",
        tokenExpiration: 3600000
    });

    let accessTokenFromClient = req.headers.authorization.split(' ')[1];

    if (!accessTokenFromClient) {
        res.status(401).send("Access Token missing from header" );
    }
    
    cognitoExpress.validate(accessTokenFromClient, function (err, response) {

        if (err) res.status(401).send(err);

        res.locals.user = response;

        next();
    });
}