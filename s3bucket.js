var AWS = require('aws-sdk');

let accessKeyId = process.env.aws_access_key_id
let secretAccessKey = process.env.aws_secret_access_key


let awsConfig = {
    "region": "us-east-2",
    "accessKeyId": accessKeyId,
    "secretAccessKey": secretAccessKey
}
AWS.config.setPromisesDependency();
AWS.config.update(awsConfig)
const getObjects = async () => {
    try {
        const s3 = new AWS.S3();
        const response = await s3.listObjectsV2({
            Bucket: 'writer.backet.adws'
        }).promise()

        console.log(response)
        
    } catch (e) {
        console.log(e.message)
    }

    debugger;
}

getObjects()

