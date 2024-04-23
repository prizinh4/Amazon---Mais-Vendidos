const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // consulta ao DynamoDB para buscar todos os produtos 
        const params = {
            TableName: 'MaisVendidos_Amazon',
        };

        const data = await dynamodb.scan(params).promise();

        // retorna a resposta com todos os produtos
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao obter todos os produtos' })
        };
    }
};
