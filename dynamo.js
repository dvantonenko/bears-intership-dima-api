let AWS = require('aws-sdk')
require('dotenv').config()

let awsConfig = {
    "region": "us-east-2",
    "accessKeyId": process.env.ACCESS_KEY_ID,
    "secretAccessKey": process.env.SECRET_ACCESS_KEY
}


AWS.config.update(awsConfig)

let docClient = new AWS.DynamoDB.DocumentClient()

const dynamoFunc = () => {
    const fetchOneByKey = (artist, songTitle) => {
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
        }).then(response => console.log(response))
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
            })
           
            items.Items.forEach((item) => scanResult.push(item))

        } while (typeof items.LastEvaluatedKey != "undefined")

        return scanResult
    }
   
    const putItem = async (artist, songTitle) => {
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


    const updateItem = (primaryKey) => {
        var params = {
            TableName: 'Books',
            Key: {
                'Author': `${primaryKey}`,
            },
            UpdateExpression: 'set TITLE = :x, #MyVariable = :y', 
           
            ExpressionAttributeNames: {
                "#MyVariable": "Book"
            },
            ExpressionAttributeValues: {
                ":x": "alex_title",
                ":y": "Три мушкетера"
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

   
    const deleteItem = (primaryKey) => {
        var params = {
            Key: {
                'Author': `${primaryKey}`
            },
            TableName: 'Books'
        };

        docClient.delete(params, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
            }
        });
    }

    return { fetchOneByKey, fetchAllItems, putItem, updateItem, deleteItem }
}


module.exports = dynamoFunc