const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const AWS = require('aws-sdk');
require('dotenv').config()

const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.APP_CLIENT_ID
}

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

const getPasswordErrors = (request, source) => {
    request.check('password', "Pssword must be at least 6 characters long.").isLength({ min: 6 })
    request.check('password', "Password must contain a number.").matches(/[0-9]/)
    request.check('password', "Password must contain lower case letter.").matches(/[a-z]/)
    request.check('password', "Password must contain an upper case letter.").matches(/[A-Z]/)
}
// auth/register
exports.registerController = async (req, res) => {
    try {
        const { username, password, surename, email } = req.body
        const emailData = {
            Name: 'email',
            Value: email
        }
        const surenameData = {
            Name: "family_name",
            Value: surename
        }

        const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(emailData)
        const surenameAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(surenameData)

        userPool.signUp(username, password, [emailAttribute, surenameAttribute], null, (err, data) => {
            if (err) {
                return res.json(err)
            } else {
                return res.json(data)
            }

        })
    } catch (e) {
        throw new Error(e)
    }
}
// /auth/login
exports.loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body

        const loginDetails = {
            Username: email,
            Password: password
        }

        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(loginDetails)

        const userDetails = {
            Username: email,
            Pool: userPool
        }

        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userDetails)
        
        const data = cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: data => {
                var accessToken = data.getAccessToken().getJwtToken();

                if (cognitoUser != null) {
                    cognitoUser.getSession(function (err, session) {
                        if (err) {
                            console.log(err.message);
                            return;
                        }
                        console.log('session',session)
                    }
                    )
                }

                return res.json(accessToken)
            },
            onFailure: err => {
                return res.json(err)
            }
        })
        
    } catch (e) {
        throw new Error(e)
    }
}
