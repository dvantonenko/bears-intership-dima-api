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
                'id': Number(id)
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
                'id': Number(id),
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
                console.log(err)
                throw new Error("Failed to update data", err.message)
            });
    }

    const getAllData = async (params) => {

        let data = await docClient.scan(params).promise();

        if (data['Items'].length > 0) {
            let allData = []
            allData = [...allData, ...data['Items']];
        }

        if (data.LastEvaluatedKey) {
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            return await getAllData(params);

        } else {
            return data
        }
    }

    const fetchAllPosters = async (tableName, currentPage, postersPerPage, listId) => {

        
        let indexOfLast = currentPage * postersPerPage
        let indexOfFirst = indexOfLast - postersPerPage
        let params = {
            TableName: `${tableName}`,
            FilterExpression: postersPerPage === 1 ? ' id = :first ' : 'id between :first and :last',
            ExpressionAttributeValues: postersPerPage === 1 ? {
                ':first': listId.length &&  Number(listId[indexOfFirst]),

            } : {
                    ':first': listId.length &&  Number(listId[indexOfFirst]),
                    ':last':  listId.length && ( listId[indexOfLast - 1] ? Number(listId[indexOfLast - 1]) : Number(listId[listId.length - 1])),
                },
            Limit: 1000,
        }
        let queryResult = []
        let postersLength = null
        try {
            let response = await getAllData(params);
            queryResult = response.Items

            function sort(arr) {
                arr.sort((a, b) => a.id > b.id ? 1 : -1);
            }
            sort(queryResult)

        }
        catch (error) {
            console.log(error);
        }

        postersLength =  listId.length
        return { queryResult, postersLength }
    
    }

    const fetchByKey = async (id) => {
        let poster = {};
        let params = {
            TableName: 'PostersList',
            Key: { "id": Number(id) }
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