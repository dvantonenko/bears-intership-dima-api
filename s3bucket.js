var AWS = require('aws-sdk');


let awsConfig = {
    "region": "us-east-2",
    "accessKeyId":  process.env.aws_access_key_id_myown,
    "secretAccessKey": process.env.aws_secret_access_key_myown,
}

AWS.config.setPromisesDependency();
AWS.config.update(awsConfig)
const getObjects = async () => {
    try {
        //check contain bucket
        const s3 = new AWS.S3();
        await s3.listObjectsV2({
            Bucket: 'writer.backet.adws'
        }).promise().then(response => console.log(response))
        //print list buckets
        s3.listBuckets(function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.Buckets);
            }
        });
        //create new bucket
        var bucketParams = {
            Bucket: 'create.bucket'//name of new bucket
        };
        s3.createBucket(bucketParams, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.Location);
            }
        });


    } catch (e) {
        console.log(e.message)
    }

    debugger;
}

getObjects()

