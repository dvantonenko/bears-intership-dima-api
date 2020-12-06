let AWS = require('aws-sdk')

let accessKeyId =process.env.ACCESSKEYID
let secretAccessKey=proces.env.SECRETACCESSKEY

let awsConfig = {
    "region": "us-east-2",
    accessKeyId ,
    secretAccessKey
}


AWS.config.update(awsConfig)

let docClient = new AWS.DynamoDB.DocumentClient()

const dynamoFunc = () => {

    const fetchOneByKey = (artist, songTitle) => {//поиск по 1 ел
        let params = {
            TableName: 'Music',
            Key: { "Artist": `${artist}`, "Song Title": `${songTitle}` }
        }

        docClient.get(params, function (err, data) {
            if (err) {
                console.log(JSON.stringify(err, null, 2))
            } else {
                console.log(JSON.stringify(data, null, 2))
            }
        })
    }

    const fetchAllItems = async (tableName = "Music") => {
        let params = {
            TableName: `${tableName}`,
        };
        let scanResult = [];
        let items;
        do {
            items = await docClient.scan(params, (err, data) => {
                if (err) {
                    console.error("Scan wrong", JSON.stringify(err, null, 2));
                }
                console.log("Scan succeeded.");
            }).promise()
            items.Items.forEach((item) => scanResult.push(item))
        } while (typeof items.LastEvaluatedKey != "undefined")

        return scanResult
    }

    const putItem =async (artist, songTitle) => {
        var params = {
            TableName: 'Music',
            Item: {
                HashKey: 'haskey',
                NumAttribute: 1,
                BoolAttribute: true,
                ListAttribute: [1, 'two', false],
                MapAttribute: { foo: 'bar' },
                NullAttribute: null,
                "Artist": `${artist}`,
                "Song Title": `${songTitle}`
            }
        };

        await docClient.put(params, function (err, data) {
            if (err) {
                console.error(err)
            } else {
                console.log(`item was successfully written`)
            }
        })
    }

    return { fetchOneByKey, fetchAllItems, putItem }
}

module.exports = dynamoFunc