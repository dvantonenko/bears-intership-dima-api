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
            .catch(err => { throw new Error("Failed to create post", console.log(err)) })
    }

    const deletePoster = (tableName, obj) => {
        const { id } = obj
        var params = {
            Key: {
                'id': `${id}`
            },
            TableName: `${tableName}`
        };

        docClient.delete(params)
            .promise().then()
            .catch(err => { throw new Error("Failed to delete post", err.message) });

    }

    const updatePoster = async (obj) => {
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

        await docClient.update(params)
            .promise()
            .catch(err => {
                throw new Error("Failed to update data", err.message)
            });
    }

    const fetchAllPosters = async (tableName, currentPage, postersPerPage) => {
        const start = Date.now()
        let indexOfLast = currentPage * postersPerPage
        let indexOfFirst = indexOfLast - postersPerPage
        let queryResult = []
        let postersLength
        let params = {
            TableName: `${tableName}`,
        };
        await docClient.scan(params)
            .promise()
            .then(
                response => {
                    postersLength = response.Items.length
                    queryResult = response.Items.slice(indexOfFirst, indexOfLast)
                },
                err => { throw new Error("Error recieved data", err) }
            )

        console.log(Date.now() - start)
        return { queryResult, postersLength }
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