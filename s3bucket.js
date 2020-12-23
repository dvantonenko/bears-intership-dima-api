var fs = require('fs')
var path = require('path')
var AWS = require('aws-sdk');
const crypto = require('crypto')

let awsConfig = {
    "region": "us-east-2",
    "accessKeyId": 'AKIAZWKDUOQJDGQDQIWC',
    "secretAccessKey": "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",
}

AWS.config.setPromisesDependency();
AWS.config.update(awsConfig)

const s3Bucket = () => {

    const s3 = new AWS.S3();

    const createBucket = () => {
        var params = {
            Bucket: 'posters.images'
        };
        s3.createBucket(params, function (err, data) {
            if (err) {
                console.log("Couldn't to create bucket", err);
            } else {
                console.log("Bucket have been created");
            }
        });
    }

    const getBucketContain = async () => {
        await s3.listObjectsV2({
            Bucket: 'posters.images'
        }).promise().then(response => console.log(response),
            err => { throw new Error(err) })
    }

    const getListBuckets = async () => {
        let list
        await s3.listBuckets()
            .promise()
            .then(response => { list = response },
                err => { throw new Error(err) });
        return list
    }

    const deleteBucket = async () => {
        var params = {
            Bucket: 'posters.images'
        };
        await s3.deleteBucket(params)
            .promise()
            .then(response => console.log(response),
                err => { throw new Error(err) })
    }

    async function putToBucket(file, key) {
        const s3 = new AWS.S3({
            params:
                { Bucket: 'posters.images' }
        })
        var params = {
            Key: `${key}`,
            Body: file ,
            ACL : 'public-read'
        }
    
        await s3.upload(params).promise().then(response => console.log(response,'Item was upload'),
            err => { throw new Error(err) })
    }

    const getFromBucket = async (key) => {
        var s3 = new AWS.S3()
        var params = { Bucket: "posters.images", Key: key.toString() }
        let src = ''

        function encode(data) {
            let buf = Buffer.from(data);
            let base64 = buf.toString('base64');
            return base64
        }

        await s3.getObject(params)
            .promise()
            .then(data => {
                src = "data:image/png;base64," + encode(data.Body)
            },
                err => { throw new Error("Failed to get from Bucket", err) })
        return src
    }

    async function deleteFromBucket() {
        var s3 = new AWS.S3()

        var params = { Bucket: "posters.images", Key: 'myImage.jpg' }

        await s3.deleteObject(params)
            .promise()
            .catch(err => { throw new Error('Failed to delete item from  bucket', err) })

    }
    debugger;
    return { putToBucket, getFromBucket }
}
module.exports = s3Bucket