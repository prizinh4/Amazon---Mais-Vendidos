const puppeteer = require("puppeteer");
const AWS = require("aws-sdk");

// configuração do SDK da AWS
AWS.config.update({
  region: "us-east-2", 
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY 
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

// função que realiza o envio para o dynamoDB
async function enviarParaDynamoDB(item) {
    const params = {
        TableName: "MaisVendidos_Amazon",
        Item: item
    };

    try {
        await dynamodb.put(params).promise();
        console.log("Item inserido com sucesso:", item);
    } catch (error) {
        console.error("Erro ao inserir item no DynamoDB:", error);
    }
}

async function scraper() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 900 });

    await page.goto("https://www.amazon.com.br/bestsellers/");
    await page.reload();

    // espera até que a lista ordenada carregue
    await page.waitForSelector('#anonCarousel1 > ol');

    console.log("Lista ordenada carregada!");

    // extrai os elementos li dentro da lista ordenada
    const liElements = await page.$$('#anonCarousel1 > ol > li');

    console.log("Número de elementos encontrados:", liElements.length);

    //itera sobre os elementos e extrai informações
    for (const liElement of liElements) {
        const posicao = await liElement.$eval('.zg-bdg-text', element => element.innerText);
        const nome = await liElement.$eval('.p13n-sc-truncate-desktop-type2', element => element.innerText);
        const estrelas = await liElement.$eval('a[title*="estrelas"]', element => element.getAttribute('title'));
        const avaliacoes = await liElement.$eval('a[title*="estrelas"] .a-size-small', element => element.innerText);
        const preco = await liElement.$eval('div._cDEzb_p13n-sc-price-animation-wrapper_3PzN2', element => element.innerText);

        // constrói o item a ser inserido 
        const item = {
            nome: nome,
            posicao: posicao,
            estrelas: estrelas,
            avaliacoes: avaliacoes,
            preco: preco
        };

        // envia para o DynamoDB
        await enviarParaDynamoDB(item);
            
    }

    await browser.close();
}

scraper().catch(error => {
    console.error("Erro no scraper:", error);
});