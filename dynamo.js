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

const dynamoFunc = () => {
    //забрать 1 елемент по ключу
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
    // забрать все елементы таблицы
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
    // добавить 1 итем
    const putItem = async (artist, songTitle) => {
        var params = {
            TableName: 'Music',
            Item: {
                HashKey: 'haskey',// Эти поля необязательны , обазетелен только первичый ключ,остальные полня указываем сами
                NumAttribute: 1,// --"--
                BoolAttribute: true,// --"--
                ListAttribute: [1, 'two', false],// --"--
                MapAttribute: { foo: 'bar' },// --"--
                NullAttribute: null,// --"--
                "Artist": `${artist}`,//это поле обязательно           
                "Song Title": `${songTitle}`// и это тоже
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
// апдейт елемента: изменение существущих и добовление новых параметров
    const updateItem = (primaryKey) => {
        var params = {
            TableName: 'Books',
            Key: {//тут пишем по какому ключу будем искать елемент 
                'Author': `${primaryKey}`,
            },
            UpdateExpression: 'set TITLE = :x, #MyVariable = :y', // тут пишем какие параметры и значения нужно сменить в формате:
            // Параметр(существующий) = :х(новое значение(шаблон)) , или  #MyVariable(мой параметр-шаблон) = :y(новое значение(шаблон))" 
            ExpressionAttributeNames: {
                "#MyVariable": "Book"// тут указываем значение шаблона который указали ранее
            },
            ExpressionAttributeValues: {//тут указываем значение параметров-шаблонов которые указали ранее
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

// удаление елемента из таблицы 
const deleteItem = (primaryKey) =>{
    var params = {
        Key: {
          'Author': `${primaryKey}`//указываем значение по первичному ключу
        },
        TableName: 'Books'// указываем названия таблицы
      };
      
      docClient.delete(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
        }
      });
}

    return { fetchOneByKey, fetchAllItems, putItem , updateItem , deleteItem}
}

module.exports = dynamoFunc