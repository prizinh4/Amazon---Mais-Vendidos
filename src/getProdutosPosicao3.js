const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // consulta ao DynamoDB para buscar só os produtos que já ficaram na posição 3
        const params = {
            TableName: 'MaisVendidos_Amazon',
            FilterExpression: '#posicao = :posicao',
            ExpressionAttributeNames: {
                '#posicao': 'posicao'
            },
            ExpressionAttributeValues: {
                ':posicao': '3'
            }
        };

        const data = await dynamodb.scan(params).promise();

        // retorna os produtos na posição 1
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao obter produtos da posição 1' })
        };
    }
};
