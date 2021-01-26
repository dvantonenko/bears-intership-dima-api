let AWS = require('aws-sdk')
require('dotenv').config()
let awsConfig = {
    "region": "us-east-2",
    "accessKeyId": process.env.ACCESS_KEY_ID,
    "secretAccessKey": process.env.SECRET_ACCESS_KEY
}

AWS.config.update(awsConfig)

let docClient = new AWS.DynamoDB.DocumentClient()


exports.addPoster = async (tableName, obj) => {
    console.log('obj',obj)
        var params = {
            TableName: `${tableName}`,
            Item: obj
        };

        await docClient.put(params)
            .promise()
            .catch(err => { throw new Error("Failed to create post", console.log(err)) })
    }

    exports.deletePoster = async (tableName, obj) => {
        const { id } = obj
        var params = {
            Key: {
                'id': Number(id),
                'Posts': 'posts'
            },
            TableName: `${tableName}`
        };

        await docClient.delete(params)
            .promise()
            .then()
            .catch(err => { throw new Error("Failed to delete post", err.message) });

    }

    exports.updatePoster = async (obj) => {
        const { title, subtitle, description, src, id } = obj
        var params = {
            TableName: 'PosterLists',
            Key: {
                'id': Number(id),
                'Posts': 'posts'
            },
            UpdateExpression: 'set title = :a , subtitle = :b  , description = :c , src = :d',
            ExpressionAttributeValues: {
                ":a": `${title}`,
                ":b": `${subtitle}`,
                ":c": `${description}`,
                ":d": `${src}`
            }

        };

        await docClient.update(params)
            .promise()
            .then()
            .catch(err => {
                throw new Error("Failed to update data", err.message)
            });
    }

    exports.fetchAllPosters = async (tableName, currentPage, postersPerPage, lastKey) => {
        var params = {
            ExpressionAttributeValues: {
                ":v1": 'posts',
            },
            ExclusiveStartKey: lastKey ? { id: Number(lastKey), Posts: 'posts' } : undefined,
            KeyConditionExpression: "Posts = :v1",
            TableName: `${tableName}`,
            Limit: 2
        };
        const data = await docClient.query(params).promise()
        if (data.LastEvaluatedKey) { lastElemKey = data.LastEvaluatedKey }
        else {
            lastElemKey = 0
        }
        queryResult = data.Items
        return { queryResult, lastElemKey }
    }

    exports.fetchByKey = async (id) => {
        let poster = {};
        let params = {
            TableName: 'PosterLists',
            Key: { "id": Number(id), "Posts": 'posts' }
        }

        await docClient.get(params)
            .promise()
            .then(
                response => poster = response,
                err => { throw new Error("Key data not found", err.message) }
            )
        return poster
    }


