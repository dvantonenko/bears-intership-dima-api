
const serverless = require('serverless-http');
const app = require('./index');
console.log(app)
module.exports.index = serverless(app);


