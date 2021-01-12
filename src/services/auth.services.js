const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
let AWS = require('aws-sdk')
require('dotenv').config()

const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.APP_CLIENT_ID
}
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)

const authService = () => {

    const registration = async (obj) => {

        const { username, password, surename, email } = obj
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

        return new Promise(function (resolve, reject) {
            userPool.signUp(username, password, [emailAttribute, surenameAttribute], null, (err, data) => {
                if (err) {
                    resolve(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    const login = async (obj) => {
        const { email, password } = obj
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
        return new Promise(function (resolve, reject) {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: data => {
                    let accessToken = data.getAccessToken().getJwtToken();
                    let username = data.getAccessToken().payload.username
                    if (cognitoUser != null) {
                        cognitoUser.getSession(function (err, session) {
                            if (err) {
                                console.log(err.message);
                                return;
                            }
                        })
                    }
                    resolve({ accessToken, username })
                },
                onFailure: err => {
                    resolve(err)
                },
            })
        })

    }
    return { registration, login }
}
module.exports = authService