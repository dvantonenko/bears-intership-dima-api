var AWS = require('aws-sdk');


let awsConfig = {
    "region": "us-east-2",
    "accessKeyId": "AKIA2CJM645LOBT7PSXV",
    "secretAccessKey": "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",
}

AWS.config.setPromisesDependency();
AWS.config.update(awsConfig)
const getObjects = async () => {
    try {
        //проверка содержимого конкретного бакета
        const s3 = new AWS.S3();
        await s3.listObjectsV2({
            Bucket: 'writer.backet.adws'
        }).promise().then(response => console.log(response))
        //вывод листа всех бакетов  
        s3.listBuckets(function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.Buckets);
            }
        });
        //создание нового бакета 
        var bucketParams = {
            Bucket: 'create.bucket'//указываем имя бакета которые хотим создать
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

