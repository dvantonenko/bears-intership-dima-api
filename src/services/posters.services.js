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
        let result;
        result = await docClient.put(params, function (err, data) {
            if (err) {
                throw new Error(err.message)
            } else {
                return 'Пост успешно добавлен'
            }
        })
    
    }
    
    const deletePoster = (tableName, id) => {
    
        var params = {
            Key: {
                'id': `${id}`//указываем значение по первичному ключу
            },
            TableName: `${tableName}`// указываем названия таблицы
        };
    
        docClient.delete(params, function (err, data) {
            if (err) {
                throw new Error(err.message)
            } else {
                return 'Пост успешно удален'
            }
        });
    }
    
    const fetchAllPosters = async (tableName) => {
        let params = {
            TableName: `${tableName}`,
        };
        let scanResult = [];
        let items;
        do {
            items = await docClient.scan(params).promise()
            items.Items.forEach((item) => scanResult.push(item))
        } while (typeof items.LastEvaluatedKey != "undefined")
    
        return scanResult
    }
    
    const updatePoster = (id, obj) => {
        const { title, subtitle, discription ,src } = obj
        var params = {
            TableName: 'PostersList',
            Key: {//пишем по какому ключу будем искать елемент 
                'id': `${id}`,
            },
            UpdateExpression: 'set title = :a , subtitle = :b  , discription = :c , src = :d', //пишем какие параметры и значения нужно сменить в формате:
            ExpressionAttributeValues: {//указываем значение параметров-шаблонов которые указали ранее
                ":a": `${title}`,
                ":b": `${subtitle}`,
                ":c": `${discription}`,
                ":d": `${src}`
            }
        };
    
        docClient.update(params, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
            }
        });
    }

    const fetchByKey =async (id) => {
        let poster = {};
        let params = {
            TableName: 'PostersList',
            Key: { "id": `${id}`}
        }

        await docClient.get(params).promise().then(response => poster = response)

        return poster
    }

    return {  addPoster , deletePoster , fetchAllPosters , updatePoster ,fetchByKey}
}

module.exports=postersService