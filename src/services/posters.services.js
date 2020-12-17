let AWS = require('aws-sdk')

let accessKeyId = process.env.aws_access_key_id
let secretAccessKey = process.env.aws_secret_access_key


let awsConfig = {
    "region": "us-east-2",
    "accessKeyId": accessKeyId,
    "secretAccessKey": secretAccessKey
}


AWS.config.update(awsConfig)

let docClient = new AWS.DynamoDB.DocumentClient()

const postersService = () => {

    const addPoster = async (tableName, obj) => {

        var params = {
            TableName: `${tableName}`,
            Item: obj
        };

        await docClient.put(params)
            .promise()
            .catch(err => { throw new Error("Failed to create post", err.message) })
    }

    const deletePoster = (tableName, id) => {

        var params = {
            Key: {
                'id': `${id}`
            },
            TableName: `${tableName}`
        };

        docClient.delete(params)
            .promise()
            .catch(err => { throw new Error("Failed to delete post", err.message) });
    }

    const fetchAllPosters = async (tableName) => {
        let params = {
            TableName: `${tableName}`,
        };
        let scanResult = [];
        let items;
        items = await docClient.scan(params)
            .promise()
            .then(
                response =>{response.Items.forEach(item => scanResult.push(item))} ,
                err => { throw new Error("Error recieved data", err) }
            )

        return scanResult
    }

    const updatePoster = (obj) => {
        const { title, subtitle, description, src, id } = obj

        var params = {
            TableName: 'PostersList',
            Key: {
                'id': `${id}`,
            },
            UpdateExpression: 'set title = :a , subtitle = :b  , description = :c , src = :d',
            ExpressionAttributeValues: {
                ":a": `${title}`,
                ":b": `${subtitle}`,
                ":c": `${description}`,
                ":d": `${src}`
            }
        };

        docClient.update(params)
            .promise()
            .catch(err => { throw new Error("Failed to update data", err.message) });
    }

    const fetchByKey = async (id) => {
        let poster = {};
        let params = {
            TableName: 'PostersList',
            Key: { "id": `${id}` }
        }

        await docClient.get(params)
            .promise()
            .then(
                response => poster = response,
                err => { throw new Error("Key data not found", err.message) }
            )
        return poster
    }

    return { addPoster, deletePoster, fetchAllPosters, updatePoster, fetchByKey }
}

module.exports = postersService